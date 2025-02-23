/**
 * @module ts-data-objects
 * @description
 * Main exported module containing the implementation of `ts-data-objects` library.
 *
 * @exports
 * - Assertions:
 *   - `isBool`, `isOptionalBool` - Boolean validation
 *   - `isNum`, `isOptionalNum` - Number validation
 *   - `isStr`, `isOptionalStr` - String validation
 *   - `isObject`, `isOptionalObject` - Object validation
 *   - `isArrayOf`, `isOptionalArrayOf` - Array validation
 *
 * - Core Components:
 *   - `dataGuard` - Creates type guards
 *   - `dataObject` - Creates object constructors
 *   - `dataParser` - Combines validation and construction
 *   - `DataValidationError` - Custom Error thrown on validation failures
 *   - `defineObject` - High-level object definition
 *
 * @packageDocumentation
 */


export {
	isBool, isOptionalBool,
	isNum, isOptionalNum,
	isStr, isOptionalStr,
	isObject, isOptionalObject,
	isArrayOf, isOptionalArrayOf,
	DataValidationError,
} from '@/common'
export { dataGuard, dataObject, dataParser, defineObject } from '@/core'
