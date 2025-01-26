import { useLogger } from 'node-pretty-logger'
import { rmrf } from './utils/remover'

const { info, success, error } = useLogger('Cleaner')
info('Removing generated directories: dist, node_modules, docs, tmp')
rmrf('dist/', success, error)
rmrf('docs/', success, error)
rmrf('tmp/', success, error)
