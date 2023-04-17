function parse(obj) {
  const io = Object.entries(obj)
    .map(([key, value]) => [key, value.filter(Boolean)])
    .filter(([_, value]) => value.length);

  return io.length > 0 ? Object.fromEntries(io) : undefined;
}

export function getConfig({ garou, stylelint, eslint, prettier }) {
  const useColor = process.stdin.isTTY ? ' --color' : '';

  return parse({
    '*.{vue,html,htm,md}': [
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix -f=pretty${useColor}`,
    ],
    '*.{ts,tsx,mts,cts}': [
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      eslint && `eslint --fix -f=pretty${useColor}`,
    ],
    '*.{js,jsx,mjs,cjs,wxs,qs}': [
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      eslint && `eslint --fix -f=pretty${useColor}`,
    ],
    '*.{c,sc,le,wx,q,tt,jx,ac}ss': [
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
    ],
    '*.{json,yml,yaml,svg}': [
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
    ],
    '{*.{jsonc,webmanifest,editorconfig,toml},.{babel,npm}rc}': [
      prettier && `prettier -w -u${useColor}`,
    ],
    '{*.jenkinsfile,{j,J}enkinsfile}': [
      prettier && `prettier -w -u${useColor}`,
    ],
    'yarn.lock': [garou && 'garou'],
  });
}
