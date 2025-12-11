module.exports = {
  testEnvironment: 'jsdom',
  // Use babel-jest to transpile TS/JSX and ESM dependencies used in tests
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  // Transpile axios and any other ESM subpath that Jest might try to load
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)'
  ],
  moduleNameMapper: {
    // Prefer axios CommonJS build when available to avoid ESM interop issues
    '^axios$': require.resolve('axios/dist/node/axios.cjs'),
    // Map CSS imports to proxy
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Static assets
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
