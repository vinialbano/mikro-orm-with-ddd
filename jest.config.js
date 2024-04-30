module.exports = {
  testEnvironment: "node",
  transform: {
      "^.+\\.(t|j)s?$": ["@swc/jest"]
    },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],

  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
};