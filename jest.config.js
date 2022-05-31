const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "." });

const customJestConfig = {
	clearMocks: true,
	moduleDirectories: ["node_modules", "<rootDir>", "src"],
	setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
	testRegex: "(/__tests__/.*|(\\.|/)test)\\.[jt]sx?$",
	testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
