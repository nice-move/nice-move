import { resolve } from 'path';
import { fileURLToPath } from 'url';

function parse(obj) {
  const io = Object.entries(obj)
    .map(([key, value]) => [key, value.filter(Boolean)])
    .filter(([_, value]) => value.length);

  return io.length > 0 ? Object.fromEntries(io) : undefined;
}

export function getConfig({
  rustywind,
  garou,
  stylelint,
  eslint,
  prettier,
  typescript,
}) {
  const useColor = process.stdin.isTTY ? ' --color' : '';

  const yarnConfig = resolve(fileURLToPath(import.meta.url), '../yarn.cjs');

  return parse({
    '*.{{wx,tt,q,ax,jx,ks}ml,swan}': [rustywind && 'rustywind --write'],
    '{ts,js,project.,project.private.}config.json': [garou && 'garou'],
    '*.{vue,html,htm,md}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier --write --ignore-unknown${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{ts,tsx}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier --write --ignore-unknown${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
      typescript && (() => 'tsc --noEmit'),
    ],
    '*.{js,jsx,mjs,cjs,wxs,qs}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier --write --ignore-unknown${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    '*.{c,sc,le,wx,q,tt,jx,ac}ss': [
      garou && 'garou',
      prettier && `prettier --write --ignore-unknown${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
    ],
    '{*.{json,editorconfig,yml,yaml},.{babel,npm}rc}': [
      prettier && `prettier --write --ignore-unknown${useColor}`,
    ],
    '*.svg': [
      garou && 'garou',
      prettier && `prettier --parser html --write --ignore-unknown${useColor}`,
      prettier && `prettier --write --ignore-unknown${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix --format=pretty${useColor}`,
    ],
    'yarn.lock': [
      'yarn-deduplicate',
      `replace-in-file --configFile="${yarnConfig}"`,
    ],
  });
}
