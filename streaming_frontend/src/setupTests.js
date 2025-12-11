/* eslint-disable no-undef */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Stabilize HTMLMediaElement in jsdom so video components/tests don't throw
const mediaProto = global.window.HTMLMediaElement && global.window.HTMLMediaElement.prototype;
if (mediaProto) {
  const noop = () => {};
  Object.defineProperty(mediaProto, 'play', { configurable: true, writable: true, value: jest.fn(noop) });
  Object.defineProperty(mediaProto, 'pause', { configurable: true, writable: true, value: jest.fn(noop) });
  Object.defineProperty(mediaProto, 'load', { configurable: true, writable: true, value: jest.fn(noop) });
  Object.defineProperty(mediaProto, 'muted', { configurable: true, writable: true, value: true });
}
