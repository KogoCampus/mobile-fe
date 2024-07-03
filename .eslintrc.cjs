const path = require('path');

module.exports = {
    extends: [
        'eslint:recommended',
        'universe',
        'universe/native',
        'universe/web',
        'universe/shared/typescript-analysis',
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:testing-library/react',
        'plugin:storybook/recommended',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        {
            files: ['**/__tests__/**/*.[jt]s?(x)'],
            settings: {
                'import/resolver': {
                    node: {
                        paths: [path.resolve(__dirname, 'src')],
                    },
                },
            },
        },
    ],
    plugins: ['react', 'jest', 'react-hooks', '@typescript-eslint'],
    rules: {
        'linebreak-style': 'off',
        'func-names': 0,
        'no-useless-constructor': 0,
        'no-use-before-define': 0,
        'import/prefer-default-export': 0,
        'jest/no-identical-title': 0,
        'import/extensions': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'react/require-default-props': 0,
        'react/no-array-index-key': 0,
        'testing-library/no-unnecessary-act': 0,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.tsx'],
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        // enforce explicit Typescript typing
        '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
    env: {
        node: true,
    },
};
