/**
 * This is the doc comment for main.ts
 *
 * @packageDocumentation
 */


// TODO: test variant with nested required objects (stated by different constructor)
export {
	isBool, isOptionalBool,
	isNum, isOptionalNum,
	isStr, isOptionalStr,
	isObject, isOptionalObject,
	isArrayOf, isOptionalArrayOf,

} from '@/common'
export { dataGuard, dataObject, dataParser, defineObject } from '@/core'
export { dataDeepGuard, dataDeepParser } from '@/deep'
