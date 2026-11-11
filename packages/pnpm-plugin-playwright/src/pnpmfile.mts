import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Playwright 只认跟自己同编号的浏览器目录，编号和版本不是一对一：1.61.1 认 1228、
// 1.63.0 认 1243、1.64.1 认 1248。工程里钉的版本一旦跟缓存对不上，就报
// Executable doesn't exist。所以版本不靠人抄，装依赖时读一遍缓存里是哪个编号，
// 再翻 pnpm 全局装的 playwright，谁认这个编号就用谁的版本。
const BROWSER = 'chromium';

const log = (...args: unknown[]): void => console.error('[.pnpmfile]', ...args);

// 不跟软链走：pnpm 全局包里的 playwright-core 是指向虚拟店的软链，
// 循着它读会绕进 .pnpm，编号照样拿不到
const entry = (dir: string, ...rest: string[]): string | undefined => {
  const path = join(dir, ...rest);
  return existsSync(path) ? path : undefined;
};

const readJson = (file?: string): Record<string, unknown> | undefined => {
  if (!file || !existsSync(file)) return;
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  } catch {
    // 解析失败当成没有这个文件
  }
};

// 镜像把浏览器放在 /ms-playwright；本地默认位置分系统：
// Unix 在 ~/.cache/ms-playwright，Windows 在 %LOCALAPPDATA%/ms-playwright。
// 原生 Windows 上 HOME 通常未定义，所以不能只靠 HOME，否则会退化为相对路径。
const cacheDir = (): string => {
  const explicit = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (explicit) return explicit;
  const image = '/ms-playwright';
  if (existsSync(image)) return image;
  const local =
    process.platform === 'win32'
      ? join(process.env.LOCALAPPDATA ?? '', 'ms-playwright')
      : join(process.env.HOME ?? '', '.cache/ms-playwright');
  return local;
};

// 缓存里 chromium 的编号，留了好几份时从大到小排，逐个找能用它的 playwright。
const cachedRevisions = (): number[] => {
  const dir = cacheDir();
  return existsSync(dir)
    ? readdirSync(dir)
        .map((name) => name.match(new RegExp(String.raw`^${BROWSER}-(\d+)$`)))
        .filter((match): match is RegExpMatchArray => match !== null)
        .map((match) => Number(match[1]))
        .toSorted((a, b) => b - a)
    : [];
};

// 浏览器编号只由 playwright-core 决定：它认的编号跟缓存对上，它就是该用的版本。
// browsers.json 的 revision 在 npm 包是数字、Python 包（镜像的 driver）里是字符串。
const isRevisionAccepted = (pkgDir: string, revision: number): boolean => {
  const file = [
    entry(pkgDir, 'browsers.json'),
    entry(pkgDir, 'driver/package/browsers.json'),
    // 全局包里 playwright 和 playwright-core 是平级的，编号在 core 身上
    entry(pkgDir, '../playwright-core/browsers.json'),
  ].find(Boolean);
  const { browsers = [] } = (readJson(file) ?? {}) as {
    browsers?: Array<{ name: string; revision: number | string }>;
  };
  return browsers.some(
    (browser) =>
      browser.name === BROWSER && Number(browser.revision) === revision,
  );
};

// 全局那份装在 pnpm 的 <全局根>/global/<hash>/node_modules/playwright。
// $PNPM_HOME 只到全局根，config.globalPkgDir 到 <全局根>/global，两种都认。
// 没拿到全局根就别扫当前目录：否则会误把工程里的本地 playwright 当全局候选。
const globalPkgDirs = (globalPkgDir = ''): string[] => {
  if (!globalPkgDir) return [];
  const dirs: string[] = [];
  const collect = (container: string, depth: number): void => {
    if (!container || !existsSync(container)) return;
    let items: string[];
    try {
      items = readdirSync(container);
    } catch {
      return;
    }
    for (const item of items) {
      if (item !== 'node_modules') {
        const child = join(container, item);
        const pkg = join(child, 'node_modules/playwright');
        if (existsSync(join(pkg, 'package.json'))) dirs.push(pkg);
        else if (depth > 0) {
          // 子项可能是文件（如 package.json），不是目录就不能继续递归，
          // 否则 readdirSync 会抛 ENOTDIR。
          try {
            if (statSync(child).isDirectory()) collect(child, depth - 1);
          } catch {
            // 读不到就当作不可递归
          }
        }
      }
    }
  };
  collect(join(globalPkgDir, 'global'), 2);
  collect(globalPkgDir, 2);
  return dirs;
};

// 判定不了就返回 undefined，让 package.json 里写的版本兜底。
// 编号从大到小试：只要有一个被全局 playwright 认，就钉它的版本；
// 最大的那份没有对应全局包时，不放弃，继续看小一号的是否有人认。
const pickVersion = (globalPkgDir = ''): string | undefined => {
  const revisions = cachedRevisions();
  if (revisions.length === 0) {
    log(`no ${BROWSER} under ${cacheDir()}, keep the version in package.json`);
    return;
  }
  const dirs = globalPkgDirs(globalPkgDir);
  for (const revision of revisions) {
    for (const dir of dirs) {
      if (isRevisionAccepted(dir, revision)) {
        const { version } = (readJson(join(dir, 'package.json')) ?? {}) as {
          version?: string;
        };
        if (version) {
          log(`${BROWSER}-${revision} → playwright ${version}`);
          return version;
        }
      }
    }
  }
  log(
    `no global playwright knows any of ${BROWSER}-[${revisions.join(
      ', ',
    )}], keep the version in package.json`,
  );
};

// 要对齐的整族包：playwright 钉了哪一版，同版本的 core / test / chromium 包
// 也得是同一版，浏览器内核才认得上，否则 Executable doesn't exist。
const PW_PKGS = [
  'playwright',
  '@playwright/test',
  'playwright-core',
  'playwright-chromium',
];

type Manifest = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};

// 把 manifest 里出现的 playwright 整族包 specifier 钉成同源版本。
const pinManifest = (pkg: Manifest, version: string): Manifest => {
  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
  ] as const) {
    const deps = pkg[field];
    if (deps) {
      for (const name of PW_PKGS) {
        if (Object.hasOwn(deps, name)) deps[name] = version;
      }
    }
  }
  return pkg;
};

// pnpmfile 约定必须 default 导出，关掉该规则
// eslint-disable-next-line import-x/no-default-export
export default {
  hooks: {
    // 在解析阶段就改写 specifier，让 pnpm 正常解析出那一个版本：
    // 生成的 lockfile 天然一致，--frozen-lockfile 下也不会因为 importer
    // 引用了未登记的包而报错；真正决定装哪一版的是 pnpm 自己，不再需要
    // setup 里那条 playwright install 兜底。每个 workspace 包（乃至传递依赖）
    // 的 manifest 都会过这里，整族包因此同源。
    readPackage(pkg: Manifest): Manifest {
      const hasPw = (
        ['dependencies', 'devDependencies', 'optionalDependencies'] as const
      ).some((field) => {
        const deps = pkg[field];
        return (
          deps !== undefined && PW_PKGS.some((n) => Object.hasOwn(deps, n))
        );
      });
      if (!hasPw) return pkg;
      const version = pickVersion(process.env.PNPM_HOME ?? '');
      return version ? pinManifest(pkg, version) : pkg;
    },
  },
};
