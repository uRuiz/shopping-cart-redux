export default {
  transform: {},
  setupFilesAfterEnv: ['@testing-library/jest-dom/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
};
