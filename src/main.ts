import { calculation } from '@/implementation'
import { debug } from '#/func'

console.info('Hello SRC!?')

debug({
	test: 'value',
	calculated: calculation(10, 10, '*'),
})
