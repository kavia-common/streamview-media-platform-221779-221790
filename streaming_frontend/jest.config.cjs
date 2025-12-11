module.exports = {
  testEnvironment: 'jsdom',
  // Let CRA's jest still be used via react-scripts test, but ensure transforms work for ESM deps like axios
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)/'
  ],
  moduleNameMapper: {
    // Map CSS imports to proxy
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Static assets
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
