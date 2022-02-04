module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'import/no-unresolved': 'warn',
    'import/named': 'warn',
    'import/namespace': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/default': 'warn',
    'import/export': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
