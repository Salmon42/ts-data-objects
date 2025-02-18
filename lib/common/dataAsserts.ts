//
// List of TypeScript assertion functions for important primitives.
// In our case, when parsing from JSON, we will always get only the following types.
//
// Let's assume that no server/backend will return REST API json with BigInt value, e.g. "1234n"
// @see https://dev.to/benlesh/bigint-and-json-stringify-json-parse-2m8p
//


/**
 * Type guard function for boolean values.
 *
 * @example
 * ```typescript
 * isBool(true)    // returns true
 * isBool('true')  // returns false
 * isBool(0)       // returns false
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a boolean
 * @category Common Utils
 */
export const isBool = (value: unknown): value is boolean => typeof value === 'boolean'


/**
 * Type guard function for number values.
 *
 * @example
 * ```typescript
 * isNum(42)       // returns true
 * isNum('42')     // returns false
 * isNum(NaN)      // returns true
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a number
 * @category Common Utils
 */
export const isNum = (value: unknown): value is number => typeof value === 'number'


/**
 * Type guard function for string values.
 *
 * @example
 * ```typescript
 * isStr('hello')  // returns true
 * isStr(42)       // returns false
 * isStr('')       // returns true
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a string
 * @category Common Utils
 */
export const isStr = (value: unknown): value is string => typeof value === 'string'
