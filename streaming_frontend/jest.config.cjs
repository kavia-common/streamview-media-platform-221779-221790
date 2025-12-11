module.exports = {
  testEnvironment: 'jsdom',
  // Use babel-jest to transpile JS/JSX and ESM deps like axios
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  // Ensure axios (ESM) is transpiled for Jest
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // Map styles and static assets
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Fallback: if ESM issues persist on certain environments, use CJS build
    '^axios$': 'axios/dist/node/axios.cjs',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
