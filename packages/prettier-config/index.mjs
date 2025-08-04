import { loadOrderPreset, loadPlugin, require } from './utils.mjs';

const tailwind = loadPlugin('prettier-plugin-tailwindcss');

export default {
  htmlWhitespaceSensitivity: 'css',
  iniSpaceAroundEquals: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlSortAttributesByKey: true,
  xmlWhitespaceSensitivity: 'strict',
  ...(tailwind
    ? {
        tailwindFunctions: [
          'clsx',
          'classnames',
          'classname',
          'classNames',
          'className',
        ],
      }
    : undefined),
  importOrderParserPlugins: ['importAttributes', 'jsx'],
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
    require.resolve('./extra.mjs'),
    loadPlugin('@ianvs/prettier-plugin-sort-imports'),
    loadPlugin('prettier-plugin-diy'),
    loadPlugin('prettier-plugin-groovy'),
    loadPlugin('prettier-plugin-java'),
    loadPlugin('prettier-plugin-nginx'),
    loadPlugin('prettier-plugin-ssh-config'),
    loadPlugin('@cospaia/prettier-plugin-clojure'),
    tailwind,
  ].filter(Boolean),
  overrides: [
    ...(tailwind
      ? [
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
        ]
      : []),
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
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      options: {
        importOrderParserPlugins: ['typescript', 'importAttributes', 'jsx'],
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
      files: [
        'pnpm-lock.yaml',
        '.browserslistrc',
        'project.config.json',
        'project.private.config.json',
      ],
      options: {
        requirePragma: true,
      },
    },
    {
      files: ['*.d.ts', '*.d.mts', '*.d.cts'],
      options: {
        semi: false,
      },
    },
  ],
};
