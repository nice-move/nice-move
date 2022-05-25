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

  return parse({
    '*.{{wx,tt,q,ax,jx,ks}ml,swan}': [rustywind && 'rustywind --write'],
    '*.{vue,html,htm,md}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
      eslint && `eslint --fix -f=pretty${useColor}`,
    ],
    '*.{ts,tsx,mts,cts}': [
      rustywind && 'rustywind --write',
      garou && 'garou',
      prettier && `prettier -w -u${useColor}`,
      eslint && `eslint --fix -f=pretty${useColor}`,
      typescript && (() => 'tsc --noEmit'),
    ],
    '*.{js,jsx,mjs,cjs,wxs,qs}': [
      rustywind && 'rustywind --write',
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
    '{*.{json,jsonc,webmanifest,editorconfig,yml,yaml,toml},.{babel,npm}rc}': [
      prettier && `prettier -w -u${useColor}`,
    ],
    '*.svg': [
      garou && 'garou',
      prettier && `prettier --parser html -w -u${useColor}`,
      prettier && `prettier -w -u${useColor}`,
      stylelint &&
        `stylelint --fix --custom-formatter=node_modules/stylelint-formatter-pretty${useColor}`,
    ],
    'yarn.lock': [garou && 'garou'],
  });
}
