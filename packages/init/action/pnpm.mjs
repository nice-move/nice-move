import { Text } from 'fs-chain';
import { cyan } from '../lib/color.mts';
import { parse, stringify } from 'yaml';

export async function Pnpm() {
  new Text()
    .source('pnpm-workspace.yaml')
    .onFail(() => '')
    .onDone((text) => {
      /** @type {import('@pnpm/config').Config} */
      const config = text.trim() ? parse(text) : {};

      config.configDependencies ??= {
        'pnpm-plugin-nice-move':
          '0.2.0+sha512-l2lUgbyXPStU80fF9szueoqh26htBxsBLZZ0CY6WngH1EaCSjMYhRFGxIIg282kN03Lr1EvvzYjdsltVq6J0tw==',
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
