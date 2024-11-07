const jestConfig = {
  testEnvironment: "jsdom",
  "jest": {
  "setupFiles": ["<rootDir>/jest.setup.js"]
}
};

export default jestConfig;
