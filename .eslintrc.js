module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true,
	},
	extends: ["airbnb-base", "plugin:jest/recommended", "prettier", "plugin:@typescript-eslint/recommended"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"import/prefer-default-export": "off",
		"jest/valid-title": "off",
		"consistent-return": "off",
		"no-console": "off",
		"no-alert": "off",
	},
};
