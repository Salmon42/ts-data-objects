//
// TypeDoc configuration file
// https://typedoc.org/schema.json
//


/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
	name: 'TypeScript Data Objects',
	entryPoints: [
		'lib/main.ts',
		'lib/types.ts',
	],
	includeVersion: true,
	readme: 'tmp/doc-readme.md',
	cacheBust: true,

	navigation: {
		includeCategories: true
	},

	navigationLinks: {
		'GitHub': 'https://github.com/Salmon42/ts-data-objects',
	},

	plugin: [
		'typedoc-plugin-coverage', 				// https://www.npmjs.com/package/typedoc-plugin-coverage
		'typedoc-plugin-particles', 			// https://www.npmjs.com/package/typedoc-plugin-particles
		'typedoc-plugin-mdn-links',				// https://www.npmjs.com/package/typedoc-plugin-mdn-links
		'typedoc-plugin-inline-sources',	// https://www.npmjs.com/package/typedoc-plugin-inline-sources
		'typedoc-plugin-extras',					// https://www.npmjs.com/package/typedoc-plugin-extras
	],

	// This modifies the calculation of the coverage
	// https://typedoc.org/options/validation/#requiredtobedocumented
	requiredToBeDocumented: [
		'Project',
		'Module',
		'Namespace',
		'Enum',
		'EnumMember',
		'Variable',
		'Function',
		'Class',
		'Interface',
		'Constructor',
		'Property',
		'Method',
		'Accessor',
		'TypeAlias',
	],

	// typedoc-plugin-coverage
	coverageLabel: 'Coverage',

	// typedoc-plugin-extras
	footerTypedocVersion: true,
	footerLastModified: true,
}

// {
// 	"entryPoints": [
// 		"lib/main.ts"
// 	],
// 	"out": "docs",

// 	"plugin": [
// 		{

// 		}
// 	],
// }
