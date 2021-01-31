module.exports = {
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true,
	},
	extends: ["airbnb-base", "plugin:jest/recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"import/prefer-default-export": "off",
		"jest/valid-title": "off",
		"no-console": "off",
		"no-alert": "off",
		"no-restricted-globals": "off",
		"no-plusplus": "off",
		"no-use-before-define": "off",
		"no-unused-vars": "off",
		"no-proto": "off",
		"no-return-await": "off",
	},
	plugins: ["jest"],
};
