//
// Publish script.
// Executes npm publish in the correct place
//
import fs from 'fs'
import { execSync } from 'child_process'


/** @returns {boolean} true if success */
export const publish = () => {
	if (!fs.existsSync(`${process.cwd()}/dist`)) return false
	process.chdir('dist')
	execSync('npm publish', { stdio: ['ignore', 'inherit', 'inherit'] })
	return true
}
