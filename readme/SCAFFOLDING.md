# Scaffolding

> Documentation of the steps of what was used for scaffolding this template.
---

* `yarn create vite`
	* `Project name`: ts-lib-template
	* `Select a framework`: Vanilla
	* `Select a variant`: TypeScript

* Modify folders
	* Add `/lib`
	* Add `/types`
	* Remove `/src` & `public`
	* Move `src/vite-env.d.ts` to `/types`

* Create `vite.config.ts`

* Add dependencies:
	* dev `@types/node`
	* dev [`vite-plugin-dts`](https://www.npmjs.com/package/vite-plugin-dts)

* Add `.editorconfig` file

* Add ESLint
	* Variant - ESLint v9 (DOES NOT WORK YET)
		* `yarn create @eslint/config`
			* "How would you like to use ESLint?" → 'to check syntax, find problems, enforce code style' → `style`
			* "What type of modules does your project use?" → 'JS modules (import/export)' → `esm`
			* "Which framework does your project use?" → 'None of these' → `none`
			* "Does your project use TypeScript?" → 'Yes' → `typescript`
			* "Where does your code run?" → 'Browser && Node' → `browser, node`
			* "Which style guide do you want to follow?" → "Standard" → `standard`
				```
					The config that you've selected requires the following dependencies:
					eslint, globals, eslint-config-standard-with-typescript, @typescript-eslint/eslint-plugin@^6.4.0, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0 || ^16.0.0 , eslint-plugin-promise@^6.0.0, typescript@*, typescript-eslint, @eslint/eslintrc, @eslint/js
				```
		* Add [`vite-plugin-eslint`](https://www.npmjs.com/package/vite-plugin-eslint)

	* Variant - ESLint v8
		* [TypeScript ESLint Legacy Setup](https://typescript-eslint.io/getting-started/legacy-eslint-setup)
		* Add dependencies
			* [`yarn add -D eslint@8.57.0`](https://www.npmjs.com/package/eslint/v/8.57.0) (Last v8 version)
			* [`yarn add -D @types-eslint`](https://www.npmjs.com/package/@types/eslint)
			* → partially works!
			* [`yarn add -D @typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
			* [`yarn add -D @typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
			* Regarding vite plugins:
				* Do not use any
				* [`yarn add -D vite-plugin-eslint`](https://www.npmjs.com/package/vite-plugin-eslint) (This is unmaintained since 2022 but it does not matter. In this Pure-Library project, this is enough for now, maybe even unnecessary if we enforce linting as a separate command
				* [`yarn add -D @nabla/vite-plugin-eslint`](https://www.npmjs.com/package/@nabla/vite-plugin-eslint) (official [vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint) is unmaintained since 2022)

	* Addition: Stylistic ESLint migration
		* https://eslint.style/guide/migration
		* `yarn add -D @stylistic/eslint-plugin`

	* Helping reads:
		* https://stackoverflow.com/questions/61720584/eslint-define-folder-in-config-file-ignore-all-but-include-only

* Add Vitest
	* `yarn add -D vitest`
	* https://vitest.dev/guide/

* Add TypeDoc
	* `yarn add -D typedoc`
	* https://typedoc.org/
	* https://typedoc.org/guides/installation/#typedoc.json
