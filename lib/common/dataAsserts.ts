//
// List of TypeScript assertion functions for important primitives.
// In our case, when parsing from JSON, we will always get only the following types.
//
// Let's assume that no server/backend will return REST API json with BigInt value, e.g. "1234n"
// @see https://dev.to/benlesh/bigint-and-json-stringify-json-parse-2m8p
//


/**
 * Assertion function for boolean
 * @category Common Utils
 */
export const isBool = (value: unknown): value is boolean => typeof value === 'boolean'


/**
 * Assertion function for number
 * @category Common Utils
 */
export const isNum = (value: unknown): value is number => typeof value === 'number'


/**
 * Assertion function for string
 * @category Common Utils
 */
export const isStr = (value: unknown): value is string => typeof value === 'string'
