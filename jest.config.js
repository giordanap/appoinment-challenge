module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)','**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
    },
  };
  