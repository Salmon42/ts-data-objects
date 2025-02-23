//
// List of TypeScript assertion functions for important primitives.
// In our case, when parsing from JSON, we will always get only the following types.
//
// Let's assume that no server/backend will return REST API json with BigInt value, e.g. "1234n"
// @see https://dev.to/benlesh/bigint-and-json-stringify-json-parse-2m8p
//

export { isStr, isOptionalStr } from './string'
export { isNum, isOptionalNum } from './number'
export { isBool, isOptionalBool } from './boolean'
export { isObject, isOptionalObject } from './object'
export { isArrayOf, isOptionalArrayOf } from './array'
