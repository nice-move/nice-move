export function parseImportGroups(config) {
  const io = Array.isArray(config) ? config : [config];

  const preset = io.indexOf('nice-move-preset');

  if (preset >= 0) {
    io.splice(
      preset,
      1,
      ['electron', 'vscode'],
      '',
      [
        String.raw`^vue\/?`,
        String.raw`^@vue\/?`,
        String.raw`^vue-router\/?`,
        String.raw`^pinia\/?`,
      ],
      '',
      [
        String.raw`^prop-types\/?`,
        String.raw`^react\/?`,
        String.raw`^react-dom\/?`,
        String.raw`^react-router\/?`,
        String.raw`^react-router-dom\/?`,
      ],
      '',
      [
        String.raw`^@antv\/`,
        String.raw`^@ant-design\/`,
        String.raw`^antd\/?`,
        String.raw`^ahooks\/?`,
        String.raw`^ahooks-vue\/?`,
      ],
      '',
      [String.raw`^vant\/?`, String.raw`^@vant\/`],
      '',
      [String.raw`@tarojs\/`],
      '',
      ['^@element-plus', 'element-plus', 'element-ui'],
      '',
      [
        String.raw`^@docusaurus\/`,
        String.raw`^@theme\/`,
        String.raw`^@theme-original\/`,
        String.raw`^@generated\/`,
      ],
      '',
      String.raw`^echarts\/?`,
      '',
      String.raw`@src\/`,
      '',
    );
  }

  return io
    .map((item) =>
      (Array.isArray(item) ? item : [item]).filter(
        (subItem) => typeof subItem === 'string' && subItem.length > 0,
      ),
    )
    .filter((array) => array.length > 0)
    .map((items) => (Array.isArray(items) ? items.join('|') : items));
}
