module.exports = {
  extends: ['@nice-move/eslint-config-base'],
  overrides: [
    {
      files: '*.jsx',
      extends: [
        'airbnb',
        'airbnb/hooks',
        '@nice-move/eslint-config-base/lib/import.cjs',
        '@nice-move/eslint-config-base/lib/base.cjs',
        '@nice-move/eslint-config-base/lib/markdown.cjs',
        require.resolve('./lib/react.cjs'),
        'prettier/react',
        'prettier',
      ],
    },
  ],
};
