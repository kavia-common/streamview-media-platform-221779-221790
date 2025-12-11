module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Target current Node for Jest, ensures ESM deps like axios transpile
        targets: { node: 'current' },
      },
    ],
    // Enable JSX transform for React tests
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
