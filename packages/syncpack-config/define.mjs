/* eslint-disable unicorn/no-useless-undefined */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { findWorkspaces } from 'find-workspaces';
import { parse } from 'yaml';

/**
 * 从 pnpm-workspace.yaml 文件中读取目录配置
 * @returns {{ catalog: object, catalogs: object }} 包含目录配置的对象
 */
function readYaml() {
  try {
    const path = join(process.cwd(), 'pnpm-workspace.yaml');
    const file = readFileSync(path, 'utf8');
    const parsed = parse(file) || {};

    // 确保 catalog 和 catalogs 是对象
    return {
      catalog:
        parsed.catalog && typeof parsed.catalog === 'object'
          ? parsed.catalog
          : {},
      catalogs:
        parsed.catalogs && typeof parsed.catalogs === 'object'
          ? parsed.catalogs
          : {},
    };
  } catch (error) {
    console.error('Failed to read pnpm-workspace.yaml:', error);

    return { catalog: {}, catalogs: {} };
  }
}

/**
 * 读取 package.json 文件
 * @param {string} url - 文件 URL 或 '~' 表示当前目录
 * @returns {object} package.json 内容
 */
function readPackageJson(url) {
  try {
    const path =
      url === '~'
        ? join(process.cwd(), 'package.json')
        : join(fileURLToPath(url), '../package.json');

    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    console.error('Failed to read package.json:', error);

    return {};
  }
}

/**
 * 默认的自定义类型配置
 * @type {object}
 */
const DEFAULT_CUSTOM_TYPES = {
  engines: {
    path: 'engines',
    strategy: 'versionsByName',
  },
  packageManager: {
    path: 'packageManager',
    strategy: 'name@version',
  },
  optional: {
    path: 'optionalDependencies',
    strategy: 'versionsByName',
  },
};

/**
 * 默认的 semver 组配置
 * @type {object[]}
 */
const DEFAULT_SEMVER_GROUPS = [
  {
    dependencies: [
      '@playwright/*',
      '@sentry/*',
      '@types/react-dom',
      '@types/react',
      '@vue/*',
      'playwright-*',
      'prettier',
      'react-dom',
      'react',
      'typescript',
      'vue-router',
      'vue',
    ].toSorted(),
    range: '~',
  },
  {
    dependencyTypes: ['local', 'optional', 'packageManager'],
    range: '',
  },
  {
    range: '^',
  },
];

/**
 * 创建工作区版本组配置
 * @param {object[]} workspaces - 工作区列表
 * @returns {object|undefined} 版本组配置
 */
function createWorkspaceVersionGroup(workspaces) {
  if (workspaces.length === 0) {
    return undefined;
  }

  return {
    dependencies: workspaces.map((item) => item.package.name),
    dependencyTypes: ['!local'],
    label: 'Pin pnpm workspace',
    pinVersion: 'workspace:^',
  };
}

/**
 * 创建目录版本组配置
 * @param {object} packagesMap - 包名到版本的映射对象
 * @param {object} options - 配置选项
 * @param {string} [prefix] - 版本前缀
 * @returns {object|undefined} 版本组配置
 */
function createCatalogVersionGroup(packagesMap, prefix = '') {
  const packageNames =
    packagesMap && typeof packagesMap === 'object'
      ? Object.keys(packagesMap)
      : [];

  if (packageNames.length === 0) {
    return undefined;
  }

  return {
    dependencies: packageNames,
    dependencyTypes: ['dev', 'prod', 'optional', 'peer', 'pnpmOverrides'],
    label: `Pin pnpm catalog ${prefix}`,
    pinVersion: prefix ? `catalog:${prefix}` : 'catalog:',
  };
}

/**
 * 从 catalog 和 catalogs 字段创建所有目录版本组配置
 * @param {object} options - 包含 catalog 和 catalogs 的对象
 * @param {object} [options.catalog={}] - 主目录包版本映射
 * @param {object} [options.catalogs={}] - 目录组映射，键为组名，值为包版本映射
 * @returns {object[]} 版本组配置列表
 */
function createCatalogGroups({ catalog = {}, catalogs = {} }) {
  const groups = [];

  // 处理主 catalog
  const mainGroup = createCatalogVersionGroup(catalog);

  if (mainGroup) {
    groups.push(mainGroup);
  }

  // 处理 catalogs 中的每个组
  for (const [key, packagesMap] of Object.entries(catalogs)) {
    const groupConfig = createCatalogVersionGroup(packagesMap, key);

    if (groupConfig) {
      groups.push(groupConfig);
    }
  }

  return groups;
}

/**
 * 创建 Node.js 引擎版本组配置
 * @param {object} pkg - package.json 内容
 * @returns {object} 版本组配置
 */
function createNodeEngineVersionGroup(pkg = {}) {
  return {
    dependencies: ['node'],
    dependencyTypes: ['engines'],
    label: 'Pin engines.node',
    pinVersion: pkg.engines?.node || '^20.0.0',
  };
}

/**
 * 默认的其他依赖版本组配置
 * @type {object}
 */
const DEFAULT_OTHERS_VERSION_GROUP = {
  dependencyTypes: ['!local'],
  label: 'Pin others',
  preferVersion: 'highestSemver',
};

/**
 * 定义 syncpack 配置
 * @param {string} url - 配置文件 URL
 * @param {object} config - 初始配置
 * @returns {object} 最终配置
 */
export function defineConfig(url, config = {}) {
  // 读取 package.json
  const pkg = readPackageJson(url);
  const isPnpm = pkg.packageManager?.startsWith?.('pnpm');

  // 构建版本组配置
  const versionGroups = [
    // 工作区配置
    isPnpm ? createWorkspaceVersionGroup(findWorkspaces() ?? []) : null,

    // 目录配置
    ...(isPnpm ? createCatalogGroups(readYaml()) : []),

    // 用户配置
    ...(config.versionGroups || []),

    // Node 引擎配置
    createNodeEngineVersionGroup(pkg),

    // 其他依赖配置
    DEFAULT_OTHERS_VERSION_GROUP,
  ].filter(Boolean);

  // 返回最终配置
  return {
    ...config,
    lintFormatting: false,
    customTypes: { ...DEFAULT_CUSTOM_TYPES, ...config.customTypes },
    semverGroups: [...(config.semverGroups || []), ...DEFAULT_SEMVER_GROUPS],
    versionGroups,
  };
}
