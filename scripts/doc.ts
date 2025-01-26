import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { useLogger } from 'node-pretty-logger'
import { rmrf } from './utils/remover.js'


const { info, success, error } = useLogger('Doc')


/** Helper function for transforming markdown content into toggleable part of html index for TypeDoc. */
const md2html = (filename: string): string => {
	info('md2html', filename)

	// Extract the first line (# title) and replace it
	const mdlines = readFileSync(filename, 'utf-8').split('\n')
	mdlines.unshift('~\n\n')
	const md = mdlines.join('\n')

	return `<details>
	<summary><b>${filename}</b></summary>

	${md}
	</details>
	<br>`
}

// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---

info('Packing README and CHANGELOG into single file for TypeDoc...')

const imagelink = 'Documentation Status: ![image](./coverage.svg)\n<hr/><br>'
const readme = md2html('README.md')
const changelog = md2html('readme/CHANGELOG.md')
const scaffolding = md2html('readme/SCAFFOLDING.md')
const content = `${imagelink}\n\n${readme}\n\n${changelog}\n\n${scaffolding}`

if (!existsSync('tmp')) mkdirSync('tmp')
writeFileSync('tmp/doc-readme.md', content, {
	encoding: 'utf-8',
	flag: 'w',
})

success('Generated output in /tmp/doc-readme.md.')

info('Running TypeDoc...')
execSync('typedoc', { stdio: ['ignore', 'inherit', 'inherit'] })

info('Removing /tmp directory...')
rmrf('tmp/', success, error)
