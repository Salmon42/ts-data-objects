/** @type {import('@types/eslint').ESLint.ConfigData} */
module.exports = {
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
	],
	rules: {
		'no-console': 'off',
	},
}
