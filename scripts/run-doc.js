import fs from 'fs'
import { print } from './utils/functions.js'

/** @param {string} filename */
const toggledMarkdown = (filename) => {
	console.info('> Adding', filename)

	// Extract the first line (# title) and replace it
	const mdlines = fs.readFileSync(filename, 'utf-8').split('\n')
	mdlines[0] = '~\n\n'
	const md = mdlines.join('\n')

	return `<details>
	<summary><b>${filename}</b></summary>

	${md}
	</details>
	<br>`
}

print('Packing README and CHANGELOG into single file for TypeDoc...')

const imagelink = 'Documentation Status: ![image](./coverage.svg)\n<hr/><br>'
const readme = toggledMarkdown('README.md')
const changelog = toggledMarkdown('CHANGELOG.md')
const scaffolding = toggledMarkdown('SCAFFOLDING.md')
const content = `${imagelink}\n\n${readme}\n\n${changelog}\n\n${scaffolding}`

if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')
fs.writeFileSync('tmp/doc-readme.md', content, {
	encoding: 'utf-8',
	flag: 'w',
})

print('Generated output in /tmp/doc-readme.md.')
