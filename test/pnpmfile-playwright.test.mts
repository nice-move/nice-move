import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { afterEach, beforeEach, expect, it, onTestFinished, vi } from 'vitest';

import pnpmfile from '../packages/pnpm-plugin-playwright/src/pnpmfile.mts';

const { afterAllResolved } = pnpmfile.hooks;

type Lockfile = Parameters<typeof afterAllResolved>[0];

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

const makeLockfile = (): Lockfile => ({
  pnpmfileChecksum: 'stale-checksum',
  importers: {
    '.': {
      dependencies: {
        playwright: { specifier: '^1.60.0', version: '1.60.0' },
        svgo: { specifier: '^4.0.2', version: '4.0.2' },
      },
      devDependencies: {
        '@playwright/test': { specifier: '^1.60.0', version: '1.60.0' },
      },
      optionalDependencies: {
        'playwright-chromium': { specifier: '^1.60.0', version: '1.60.0' },
      },
    },
    'packages/app': {
      devDependencies: {
        'playwright-core': { specifier: '^1.60.0', version: '1.60.0' },
        vitest: { specifier: '^4.0.0', version: '4.0.0' },
      },
    },
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

it('should pin the playwright family in every importer to the accepted version', () => {
  const root = makeRoot();
  const cache = join(root, 'cache');
  makeCache(cache, [1248]);
  mkdirSync(join(cache, 'chromium_headless_shell-1248'), { recursive: true });
  mkdirSync(join(cache, 'firefox-1200'), { recursive: true });
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', cache);
  vi.stubEnv('PNPM_HOME', root);

  const lockfile = makeLockfile();
  const result = afterAllResolved(lockfile);

  expect(result).toBe(lockfile);
  expect(result.pnpmfileChecksum).toBeUndefined();
  expect(result.importers['.']?.dependencies).toEqual({
    playwright: { specifier: '1.64.1', version: '1.64.1' },
    svgo: { specifier: '^4.0.2', version: '4.0.2' },
  });
  expect(result.importers['.']?.devDependencies?.['@playwright/test']).toEqual({
    specifier: '1.64.1',
    version: '1.64.1',
  });
  expect(
    result.importers['.']?.optionalDependencies?.['playwright-chromium'],
  ).toEqual({ specifier: '1.64.1', version: '1.64.1' });
  expect(result.importers['packages/app']?.devDependencies).toEqual({
    'playwright-core': { specifier: '1.64.1', version: '1.64.1' },
    vitest: { specifier: '^4.0.0', version: '4.0.0' },
  });
});

it('should keep the lockfile when the cache has no chromium directory', () => {
  const root = makeRoot();
  const cache = join(root, 'cache');
  mkdirSync(join(cache, 'firefox-1200'), { recursive: true });
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', cache);
  vi.stubEnv('PNPM_HOME', root);

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should keep the lockfile when the cache directory does not exist', () => {
  const root = makeRoot();
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'missing'));
  vi.stubEnv('PNPM_HOME', root);

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should use the highest cached revision', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1200, 1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright).toEqual({
    specifier: '1.64.1',
    version: '1.64.1',
  });
});

it('should keep the lockfile when only a lower cached revision is accepted', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1200, 1248]);
  makeGlobalPlaywright(root, '1.61.1', 1200);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should keep the lockfile when no global playwright accepts the revision', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 9999);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should scan every global hash directory for an accepting playwright', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.61.1', 1200, { hash: 'a' });
  makeGlobalPlaywright(root, '1.64.1', 1248, { hash: 'b' });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright).toEqual({
    specifier: '1.64.1',
    version: '1.64.1',
  });
});

it('should read browsers.json from driver/package', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248, {
    browsersFile: 'driver/package/browsers.json',
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright?.version).toBe(
    '1.64.1',
  );
});

it('should read browsers.json from the sibling playwright-core package', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248, {
    browsersFile: '../playwright-core/browsers.json',
  });
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright?.version).toBe(
    '1.64.1',
  );
});

it('should accept a string revision in browsers.json', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', '1248');
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright?.version).toBe(
    '1.64.1',
  );
});

it('should find the global package when PNPM_HOME points at the global dir', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', join(root, 'global'));

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright?.version).toBe(
    '1.64.1',
  );
});

it('should fall back to the ms-playwright cache under HOME', () => {
  const root = makeRoot();
  makeCache(join(root, '.cache', 'ms-playwright'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', '');
  vi.stubEnv('HOME', root);
  vi.stubEnv('PNPM_HOME', root);

  const result = afterAllResolved(makeLockfile());

  expect(result.importers['.']?.dependencies?.playwright?.version).toBe(
    '1.64.1',
  );
});

it('should keep the lockfile when PNPM_HOME is not set', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', '');

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should treat a malformed browsers.json as absent', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  const pkgDir = makeGlobalPlaywright(root, '1.64.1', 1248);
  writeFileSync(join(pkgDir, 'browsers.json'), '{');
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
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

  expect(afterAllResolved(makeLockfile())).toEqual(makeLockfile());
});

it('should clear the checksum even when the lockfile has no importers', () => {
  const root = makeRoot();
  makeCache(join(root, 'cache'), [1248]);
  makeGlobalPlaywright(root, '1.64.1', 1248);
  vi.stubEnv('PLAYWRIGHT_BROWSERS_PATH', join(root, 'cache'));
  vi.stubEnv('PNPM_HOME', root);

  const lockfile = { pnpmfileChecksum: 'stale-checksum' } as Lockfile;
  const result = afterAllResolved(lockfile);

  expect(result).toBe(lockfile);
  expect(result).toEqual({});
});
