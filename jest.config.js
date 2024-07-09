const config = {
    projects: [
        {
            displayName: '@components',
            preset: 'jest-expo',
            setupFilesAfterEnv: [
                '@testing-library/react-native/extend-expect',
                './src/components/__tests__/setupTest.ts',
            ],
            testMatch: ['<rootDir>/src/components/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
        },
    ],
};

module.exports = config;
