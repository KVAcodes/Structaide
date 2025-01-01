// jest.setup.js
import '@testing-library/jest-dom'

// Add any global setup here
jest.setTimeout(10000) // Optional: increase timeout for all tests

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/',
      route: '/',
      asPath: '/',
      query: {},
    }
  },
}))

// Optional: Mock window.matchMedia if you're using it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})