import { createRequire } from 'module'
import { publish } from './utils/publish.js'
import { print } from './utils/functions.js'
import { prepublish } from './utils/prepublish.js'

export const require = createRequire(import.meta.url)
const pkg = require('../package.json')

print(`Publishing project ${pkg.name} v${pkg.version}`)
const r1 = prepublish()
print(r1 ? 'Prepublish complete.' : 'Prepublish aborted.')

if (!r1) process.exit(1)

const r2 = publish()
print(r2 ? 'Publish complete' : 'Publish aborted.')
