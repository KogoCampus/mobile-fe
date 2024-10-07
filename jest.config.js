const path = require('path');

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
            moduleNameMapper: {
                '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ttf)$': '<rootDir>src/components/__tests__/__mocks__/fileMock.ts',
                '\\.(css|less|scss|sass)$': '<rootDir>/src/components/__tests__/__mocks__/styleMock.ts',
            },
            transformIgnorePatterns: [
              "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))"
            ]
        },
    ],
};

module.exports = config;
