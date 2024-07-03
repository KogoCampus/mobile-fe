module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/react-native/extend-expect', './src/setupTest.ts'],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
    testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '@react-native'],
};
