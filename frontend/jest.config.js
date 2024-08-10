/**@type {import("jest").Config} */

const config = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  preset: "ts-jest",
  // testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!p-limit)/"],
  coveragePathIgnorePatterns: ["src/main.tsx"],
};

export default config;
