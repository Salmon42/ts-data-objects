import fs from 'fs'


/**
 * Helper function for transforming markdown content into toggleable part of html index for TypeDoc.
 *
 * @param {string} filename
 * @returns {string}
 */
export const md2html = (filename) => {
	console.info('> Adding', filename)

	// Extract the first line (# title) and replace it
	const mdlines = fs.readFileSync(filename, 'utf-8').split('\n')
	mdlines.unshift('~\n\n')
	const md = mdlines.join('\n')

	return `<details>
	<summary><b>${filename}</b></summary>

	${md}
	</details>
	<br>`
}
