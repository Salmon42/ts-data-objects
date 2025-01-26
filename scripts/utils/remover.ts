import { rmSync } from 'node:fs'
import type { LoggerFunction } from 'node-pretty-logger'


/**
 * * Recursive removal of directory with files & subdirectories.
 * * Does not work on deleting own `node_modules`! (tsx is being run from that directory, hence the deletion will fail)
 *
 * @param dir - the directory to recursively remove. Example: `tmp/`. Always have slash `/` at the end.
 * @param success - fn handle
 * @param error - fn handle
 */
export const rmrf = (dir: string, success: LoggerFunction, error: LoggerFunction) => {
	try {
		rmSync(dir, {
			recursive: true,
			force: true,
		})

		success('rm -rf', dir)
	}
	catch (e) {
		error('rm -rf', dir, e)
	}
}
