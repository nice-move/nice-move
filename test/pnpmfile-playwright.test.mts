import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { afterEach, beforeEach, expect, it, onTestFinished, vi } from 'vitest';

import pnpmfile from '../packages/pnpm-plugin-playwright/src/pnpmfile.mts';

const { readPackage } = pnpmfile.hooks;

type Manifest = Parameters<typeof readPackage>[0];

const writeJson = (file: string, data: unknown) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data));
};

const makeCache = (dir: string, revisions: number[]) => {
  for (const revision of revisions) {
    mkdirSync(join(dir, `chromium-${revision}`), { recursive: true });
  }
};

const makeGlobalPlaywright = (
  root: string,
  version: string,
  revision: number | string,
  {
    hash = 'a',
    browsersFile = 'browsers.json',
  }: { hash?: string; browsersFile?: string } = {},
) => {
  const pkgDir = join(root, 'global', hash, 'node_modules', 'playwright');
  writeJson(join(pkgDir, 'package.json'), { version });
  writeJson(join(pkgDir, browsersFile), {
    browsers: [{ name: 'chromium', revision }],
  });
  return pkgDir;
};

const makeManifest = (): Manifest => ({
  dependencies: {
    playwright: '^1.60.0',
    svgo: '^4.0.2',
  },
  devDependencies: {
    '@playwright/test': '^1.60.0',
  },
  optionalDependencies: {
    'playwright-chromium': '^1.60.0',
  },
});

const makeAppManifest = (): Manifest => ({
  devDependencies: {
    'playwright-core': '^1.60.0',
    vitest: '^4.0.0',
  },
});

const makeRoot = () => {
  const dir = mkdtempSync(join(tmpdir(), 'pnpmfile-playwright-'));
  onTestFinished(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

it('should pin the playwright family in every manifest to the accepted version', () => {
  const root = makeRoot();
  const cache = join(root, 'cache');
  makeCache(cache, [1248]);
  mkdirSync(join(cache, 'chromium_headless_shell-1248'), { recursive: true });
  mkdirSync(join(cache, 'firefox-1200'), { recursive: true });
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', cache);
  vi.stubEnv('PNPM_HOME', root);

  const result = readPackage(makeManifest());
  const app = readPackage(makeAppManifest());

  expect(result.dependencies).toEqual({
    playwright: '1.64.1',
    svgo: '^4.0.2',
  });
  expect(result.devDependencies?.['@playwright/test']).toBe('1.64.1');
  expect(result.optionalDependencies?.['playwright-chromium']).toBe('1.64.1');
  expect(app.devDependencies).toEqual({
    'playwright-core': '1.64.1',
    vitest: '^4.0.0',
  });
});

it('should return the manifest unchanged when it has no playwright package', () => {
  const manifest: Manifest = { dependencies: { svgo: '^4.0.2' } };
  expect(readPackage(manifest)).toBe(manifest);
});

it('should return the manifest unchanged when the cache has no chromium directory', () => {
  const root = makeRoot();
  const cache = join(root, 'cache');
  mkdirSync(join(cache, 'firefox-1200'), { recursive: true });
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', cache);
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should return the manifest unchanged when the cache directory does not exist', () => {
  const root = makeRoot();
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'missing'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should use the highest cached revision', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1200, 1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should fall back to a lower cached revision when the highest has no global playwright', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1200, 1248]);
  makeGlobalPlaywright(root, '1.61.1', 1200);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.61.1');
});

it('should return the manifest unchanged when no global playwright accepts the revision', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 9999);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should scan every global hash directory for an accepting playwright', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.61.1', 1200, { hash: 'a' });
  makeGlobalPlaywright(root, '1.64.1', 1248, { hash: 'b' });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should find a global playwright nested deeper than the hash directory', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  // 比常规 global/<hash>/node_modules/playwright 多垫一层目录，
  // 只有递归（depth 2）的 globalPkgDirs 才找得到，平铺写法会漏掉。
  const pkgDir = join(
    root,
    'global',
    'a',
    'extra',
    'node_modules',
    'playwright',
  );
  writeJson(join(pkgDir, 'package.json'), { version: '1.64.1' });
  writeJson(join(pkgDir, 'browsers.json'), {
    browsers: [{ name: 'chromium', revision: 1248 }],
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should read browsers.json from driver/package', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248, {
    browsersFile: 'driver/package/browsers.json',
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should read browsers.json from the sibling playwright-core package', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248, {
    browsersFile: '../playwright-core/browsers.json',
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should accept a string revision in browsers.json', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', '1248');
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should find the global package when PNPM_HOME points at the global dir', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', join(root, 'global'));

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should fall back to the ms-playwright cache under HOME', () => {
  // ~/.cache/ms-playwright 是 Linux/macOS 的默认位置；Windows 上 Playwright
  // 默认用 %LOCALAPPDATA%/ms-playwright，这条路径不适用，跳过以免假阳性。
  if (process.platform === 'win32') return;
  const root = makeRoot();
  makeCache(join(root, '.cache', 'ms-playwright'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', '');
  vi.stubEnv('HOME', root);
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should fall back to the ms-playwright cache under LOCALAPPDATA on Windows', () => {
  if (process.platform !== 'win32') return;
  const root = makeRoot();
  makeCache(join(root, 'AppData', 'Local', 'ms-playwright'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', '');
  vi.stubEnv('HOME', '');
  vi.stubEnv('LOCALAPPDATA', join(root, 'AppData', 'Local'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest()).dependencies?.playwright).toBe('1.64.1');
});

it('should return the manifest unchanged when PNPM_HOME is not set', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', '');

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should treat a malformed browsers.json as absent', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  const pkgDir = makeGlobalPlaywright(root, '1.64.1', 1248);
  writeFileSync(join(pkgDir, 'browsers.json'), '{');
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should skip a global playwright whose package.json has no version', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  const pkgDir = join(root, 'global', 'a', 'node_modules', 'playwright');
  writeJson(join(pkgDir, 'package.json'), {});
  writeJson(join(pkgDir, 'browsers.json'), {
    browsers: [{ name: 'chromium', revision: 1248 }],
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should return the manifest unchanged when the global playwright has no browsers.json', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  const pkgDir = join(root, 'global', 'a', 'node_modules', 'playwright');
  writeJson(join(pkgDir, 'package.json'), { version: '1.64.1' });
  // 三个候选路径都没有 browsers.json：entry() 全部返回 undefined，
  // readJson(undefined) 得到空 browsers，等价于不认这个编号。
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(readPackage(makeManifest())).toEqual(makeManifest());
});

it('should not crash when a global hash directory contains plain files', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  // global/a 是个目录，里面只有 package.json 文件、没有 node_modules/playwright。
  // 递归扫描时若把 package.json 当成目录去 readdirSync 会抛 ENOTDIR，
  // 这里验证能优雅跳过、不抛错。
  writeJson(join(root, 'global', 'a', 'package.json'), { name: 'x' });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(() => readPackage(makeManifest())).not.toThrow();
  expect(readPackage(makeManifest())).toEqual(makeManifest());
});
