module.exports = {
  // Keep jsdom for DOM testing
  testEnvironment: 'jsdom',

  // Transpile our code and selected ESM deps with babel-jest
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  // Allow transpiling axios (ESM) inside node_modules
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],

  // Setup file to extend jest-dom and stabilize media elements
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Map styles/assets to avoid non-JS imports during tests
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Fallback mapping for axios CommonJS build if environment struggles with ESM
    '^axios$': 'axios/dist/node/axios.cjs',
  },

  moduleFileExtensions: ['js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
