import fs from 'fs'
import { print } from './utils/functions.js'
import { md2html } from './utils/md2html.js'


print('Packing README and CHANGELOG into single file for TypeDoc...')

const imagelink = 'Documentation Status: ![image](./coverage.svg)\n<hr/><br>'
const readme = md2html('README.md', true)
const changelog = md2html('CHANGELOG.md')
const development = md2html('readme/DEVELOPMENT.md')
const scaffolding = md2html('readme/SCAFFOLDING.md')
const content = `${imagelink}\n\n${readme}\n\n${changelog}\n\n${development}\n\n${scaffolding}`

if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')
fs.writeFileSync('tmp/doc-readme.md', content, {
	encoding: 'utf-8',
	flag: 'w',
})

print('Generated output in /tmp/doc-readme.md.')
