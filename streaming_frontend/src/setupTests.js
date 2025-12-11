/* eslint-disable no-undef */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock HTMLMediaElement to avoid errors in jsdom
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: jest.fn(),
});
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: jest.fn(),
});
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: jest.fn(),
});
