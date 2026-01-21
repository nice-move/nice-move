import { Text } from 'fs-chain';
import { cyan } from '../lib/color.mts';
import { parse, stringify } from 'yaml';

export async function Pnpm() {
  new Text()
    .source('pnpm-workspace.yaml')
    .onFail(() => '')
    .onDone((text) => {
      const config = text.trim() ? parse(text) : {};

      config.configDependencies ??= {
        'pnpm-plugin-nice-move':
          '0.1.0+sha512-M70sSpJmx0htcWXAYdd+VtlFthhQEHWsfLIINitKLVEWs4NyCOdiyd+zGkcqJE8PwqVPd6hpiNX9edIuvB9wjw==',
      };

      config.shamefullyHoist ??= true;

      config.allowBuilds ??= {};

      return stringify(config, {
        singleQuote: true,
      });
    })
    .output()
    .logger('Set pnpm config', cyan('pnpm-workspace.yaml'))
    .catch(console.warn);
}
