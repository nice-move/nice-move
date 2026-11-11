import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Playwright 只认跟自己同编号的浏览器目录：1.61.1 认 1228、1.63.0 认 1243、
// 1.64.1 认 1248，编号和版本不是一对一。版本不靠人抄，装依赖时读缓存里的
// chromium 编号，再找全局 playwright 里认这个编号的那一版，钉进 lockfile。
const BROWSER = 'chromium';

const log = (...args: unknown[]): void => console.error('[.pnpmfile]', ...args);

const readJson = (file?: string): Record<string, unknown> | undefined => {
  if (!file || !existsSync(file)) return;
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  } catch {
    // 解析失败当成没有这个文件
  }
};

// 缓存目录：显式指定 > 镜像的 /ms-playwright > 本机的 ~/.cache/ms-playwright
const cacheDir = (): string => {
  const explicit = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (explicit) return explicit;
  const image = '/ms-playwright';
  return existsSync(image)
    ? image
    : join(process.env.HOME ?? '', '.cache/ms-playwright');
};

// 缓存里留了好几份 chromium 时取最大编号
const cachedRevision = (): number | undefined => {
  const dir = cacheDir();
  if (!existsSync(dir)) return;
  const revisions = readdirSync(dir)
    .map((name) => name.match(new RegExp(String.raw`^${BROWSER}-(\d+)$`)))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => Number(match[1]));
  return revisions.length > 0 ? Math.max(...revisions) : undefined;
};

// playwright-core 决定认哪个浏览器编号；全局包里 playwright 与 playwright-core
// 平级，编号其实在 core 身上，所以多探几个候选路径。
const isRevisionAccepted = (pkgDir: string, revision: number): boolean => {
  const candidates = [
    join(pkgDir, 'browsers.json'),
    join(pkgDir, 'driver/package/browsers.json'),
    join(pkgDir, '../playwright-core/browsers.json'),
  ];
  const { browsers = [] } = (readJson(candidates.find(existsSync)) ?? {}) as {
    browsers?: Array<{ name: string; revision: number | string }>;
  };
  return browsers.some(
    (browser) =>
      browser.name === BROWSER && Number(browser.revision) === revision,
  );
};

// pnpm 全局包装在 <全局根>/global/<hash>/node_modules/playwright。
// $PNPM_HOME 只到全局根，config.globalPkgDir 到 <全局根>/global，两种都认。
const globalPkgDirs = (globalPkgDir = ''): string[] => {
  const dirs: string[] = [];
  const roots = [join(globalPkgDir, 'global'), globalPkgDir].filter(Boolean);
  for (const root of roots) {
    if (existsSync(root)) {
      for (const hash of readdirSync(root)) {
        const pkg = join(root, hash, 'node_modules/playwright');
        if (existsSync(join(pkg, 'package.json'))) dirs.push(pkg);
      }
    }
  }
  return dirs;
};

// 找不到全局 playwright 认这个编号时返回 undefined，让 package.json 里的版本兜底
const pickVersion = (globalPkgDir = ''): string | undefined => {
  const revision = cachedRevision();
  if (revision === undefined) {
    log(`no ${BROWSER} under ${cacheDir()}, keep the version in package.json`);
    return;
  }
  for (const dir of globalPkgDirs(globalPkgDir)) {
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
  log(
    `no global playwright knows ${BROWSER}-${revision}, keep the version in package.json`,
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

type DependenciesField =
  'dependencies' | 'devDependencies' | 'optionalDependencies';
type DirectDependency = { specifier: string; version: string };
type Importer = Partial<
  Record<DependenciesField, Record<string, DirectDependency>>
>;
type Lockfile = {
  pnpmfileChecksum?: string;
  importers: Record<string, Importer>;
};

// 把一个 importer 里出现的 playwright 相关包，specifier 和 version 一起换成同源版本
const pinImporter = (importer: Importer, version: string): void => {
  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
  ] as const) {
    const deps = importer[field];
    if (deps) {
      for (const name of PW_PKGS) {
        if (Object.hasOwn(deps, name)) {
          (deps as Record<string, DirectDependency>)[name] = {
            specifier: version,
            version,
          };
        }
      }
    }
  }
};

// pnpmfile 约定必须 default 导出，关掉该规则
// eslint-disable-next-line import-x/no-default-export
export default {
  hooks: {
    // 解析完仍能改 lockfile 的地方：specifier 和 version 一起换成同源版本。
    // 这条路径不依赖 pnpm 传进来的 manifest，--frozen-lockfile 下也能改。
    // 实测这一换不会触发重新解析，snapshots 还是旧的，所以 setup 里那条
    // playwright install 仍要留着兜底。monorepo 里每个 importer 都要扫一遍，
    // 不只根那个 "."。
    afterAllResolved(lockfile: Lockfile): Lockfile {
      const version = pickVersion(process.env.PNPM_HOME);
      if (!version) return lockfile;
      // 指纹是上一个版本的 .pnpmfile 算的，改过东西就清掉让它重算
      // pnpm hook 契约：直接改/返回 lockfile，关掉 no-param-reassign
      // eslint-disable-next-line no-param-reassign
      delete lockfile.pnpmfileChecksum;
      const importers = Object.values(lockfile.importers ?? {});
      for (const importer of importers) {
        pinImporter(importer, version);
      }
      return lockfile;
    },
  },
};
