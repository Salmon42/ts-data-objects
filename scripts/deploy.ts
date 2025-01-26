import { copyFileSync, existsSync } from 'node:fs'
import { sep } from 'node:path'
import { execSync } from 'child_process'
import { useLogger } from 'node-pretty-logger'
import packageJson from '../package.json'


const { info, error, success } = useLogger('Deploy')
const cwd = process.cwd()


const copyFile = (filename: string, subdirectory?: string) => {
	const srcpath = cwd + sep + (subdirectory ? subdirectory + sep : '') + filename
	const destpath = cwd + sep + 'dist' + sep + filename
	try {
		copyFileSync(srcpath, destpath)
		success(`Copied file [${filename}] into /dist`)
	}
	catch (e) {
		error(e)
		process.exit(1)
	}
}

// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---

info(`Publishing project ${packageJson.name} v${packageJson.version}`)

info('Running prepublish...')
if (!existsSync(`${cwd}/dist`)) {
	error('The /dist folder does not exist. Use \'yarn build\' first.')
	process.exit(1)
}

copyFile('package.json')
copyFile('README.md')
copyFile('CHANGELOG.md', 'readme')
info('Prepublish done.')

// process.chdir('dist')

// try {
// execSync('npm publish', { stdio: ['ignore', 'inherit', 'inherit'] })
// success('Publish complete.')
// }
// catch (e) {
// error(e)
// process.exit(1)
// }
