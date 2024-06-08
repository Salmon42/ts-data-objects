import { dataModel } from '@/simple/dataModel'
import { dataGuard } from '@/simple/dataGuard'
import { dataParser } from '@/simple/dataParser'
import { dataDeepGuard } from '@/deep/dataDeepGuard'
import { dataDeepParser } from '@/deep/dataDeepParser'

import { isBool, isNum, isStr } from '@/core/dataAsserts'


// TODO: test variant with nested required objects (stated by different constructor)


export {
	dataModel,
	dataGuard,
	dataParser,

	dataDeepGuard,
	dataDeepParser,

	isBool,
	isNum,
	isStr,
}

// export type {}
