/** @type {import('@types/eslint').ESLint.ConfigData} */
module.exports = {
	root: true,
	env: {
		browser: true,
	},

	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	ignorePatterns: [
		// Ignored folders
		'dist',
		"docs",

		// Ignored patterns
		'lib/**/*.d.ts',

		// Ignored files
		'.eslintrc.cjs',
		'types/vite-env.d.ts',
		'typedoc.config.cjs',
	],

	plugins: [
		'@stylistic',
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],

	rules: {
		// General JS/TS
		'no-console': process.env.NODE_ENV === 'production' ?
			['error', { allow: ['warn', 'error', 'info'] }] :
			['warn', { allow: ['warn', 'error', 'info'] }],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

		// ---- ---- TypeScript only
		'@typescript-eslint/no-explicit-any': 'off',
		'@stylistic/type-generic-spacing': ['warn'],
		'@stylistic/type-named-tuple-spacing': ['warn'],

		// ---- ---- Code formatting
		'@stylistic/semi': process.env.NODE_ENV === 'production' ? ['error', 'never'] : ['warn', 'never'],
		'@stylistic/quotes': ['warn', 'single'],
		'@stylistic/comma-dangle': ['warn', 'always-multiline'],

		'@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
		'@stylistic/no-trailing-spaces': ['warn'],
		'@stylistic/spaced-comment': ['warn', 'always'],
		'@stylistic/no-multi-spaces': ['warn'],
		'@stylistic/space-before-function-paren': ['warn', 'never'],

		'@stylistic/indent': [
			'warn',
			'tab',
			{
				'SwitchCase': 0,
			}
		],

		'@stylistic/no-tabs': [
			'warn',
			{
				allowIndentationTabs: true,
			}
		],

		'@stylistic/no-multiple-empty-lines': [
			'warn',
			{
				max: 2,
				maxBOF: 0,
				maxEOF: 0
			},
		],

		'@stylistic/padded-blocks': [
			'warn',
			'never',
			{
				allowSingleLineBlocks: true,
			}
		],
	}
}
