import { loadOrderPreset, loadPlugin, require } from './utils.mjs';

export default {
  htmlWhitespaceSensitivity: 'css',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlSortAttributesByKey: true,
  xmlWhitespaceSensitivity: 'strict',
  tailwindFunctions: [
    'clsx',
    'classnames',
    'classname',
    'classNames',
    'className',
  ],
  importOrderParserPlugins: ['importAttributes'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    'electron',
    'vscode',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    // '<TYPES>',
    '',
    String.raw`^vue\/?`,
    String.raw`^@vue\/?`,
    String.raw`^vue-router\/?`,
    String.raw`^pinia\/?`,
    '',
    String.raw`^prop-types\/?`,
    String.raw`^react\/?`,
    String.raw`^react-dom\/?`,
    String.raw`^react-router\/?`,
    String.raw`^react-router-dom\/?`,
    '',
    String.raw`^@antv\/`,
    String.raw`^@ant-design\/`,
    String.raw`^antd\/?`,
    String.raw`^ahooks\/?`,
    String.raw`^ahooks-vue\/?`,
    '',
    String.raw`^vant\/?`,
    String.raw`^@vant\/`,
    '',
    String.raw`@tarojs\/`,
    '',
    '^@element-plus',
    'element-plus',
    'element-ui',
    '',
    String.raw`^@docusaurus\/`,
    String.raw`^@theme\/`,
    String.raw`^@theme-original\/`,
    String.raw`^@generated\/`,
    '',
    String.raw`^echarts\/?`,
    '',
    ...loadOrderPreset(),
    '',
    '^@/(.*)$',
    '',
    // String.raw`<TYPES>^\.\./`,
    '',
    String.raw`^\.\./`,
    '',
    // String.raw`<TYPES>^\./`,
    '',
    String.raw`^\./`,
  ].flat(),
  plugins: [
    require.resolve('@nice-move/prettier-plugin-package-json'),
    require.resolve('@prettier/plugin-xml'),
    require.resolve('prettier-plugin-ini'),
    require.resolve('prettier-plugin-css-order'),
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('./extra.mjs'),
    loadPlugin('prettier-plugin-diy'),
    loadPlugin('prettier-plugin-groovy'),
    loadPlugin('prettier-plugin-java'),
    loadPlugin('prettier-plugin-nginx'),
    loadPlugin('prettier-plugin-ssh-config'),
    loadPlugin('@cospaia/prettier-plugin-clojure'),
    loadPlugin('prettier-plugin-tailwindcss'),
  ].filter(Boolean),
  overrides: [
    {
      files: ['*.vue'],
      options: {
        tailwindAttributes: [
          'label-class',
          'value-class',
          'title-class',
          'class-name',
        ],
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      options: {
        tailwindAttributes: [
          'expandedRowClassName',
          'maskClassName',
          'overlayClassName',
          'popupClassName',
          'rootClassName',
          'rowClassName',
          'wrapClassName',
          'wrapperClassName',
        ],
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.*rc', '.*rc.json', '{t,j}sconfig.json', '.vscode/*.json'],
      options: {
        parser: 'jsonc',
      },
    },
    {
      files: ['.browserslistrc'],
      options: {
        requirePragma: true,
      },
    },
    {
      files: 'package.json',
      options: {
        parser: 'package-json',
      },
    },
    {
      files: '*.md',
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: ['*.html', '*.htm'],
      options: {
        trailingComma: 'es5',
      },
    },
    {
      files: ['.npmrc', '*.editorconfig', '*.ini', '.sentryclirc'],
      options: {
        parser: 'ini',
      },
    },
    {
      files: ['*.ttss', '*.jxss', '*.acss', '*.wxss', '*.qss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.wxs', '*.qs'],
      options: {
        parser: 'babel',
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.wxml'],
      options: {
        parser: 'html',
      },
    },
    {
      files: '.ssh/config',
      options: {
        parser: 'ssh-config',
      },
    },
    {
      files: ['pnpm-lock.yaml'],
      options: {
        requirePragma: true,
      },
    },
  ],
};
