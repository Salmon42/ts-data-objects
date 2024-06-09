### Scripts

* `yarn`: Installs dependencies
* `yarn dev`: Runs minimal `index.html` page for temporary dev-tests
* `yarn lint`: Runs ESLint on `/lib`, `/scripts` and `/tests` sources
* `yarn test`: Runs Vitest on `/tests` spec files with unit test implementations
* `yarn build`: Runs production build
* `yarn doc`: Generates TypeDoc static HTML documentation into `/docs`
* `yarn deploy`: Manually performs `npm publish` with some preparation steps
* `yarn purge`: In case of things breaking, remove all installed/generated files/folders

* Used Dependencies
	* None

* Used Dev Dependencies
	* TypeScript
	* ESLint (base, typescript, stylistic)
	* TypeDoc (and plugins)
	* Vitest
