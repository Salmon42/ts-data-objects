//
// String Asserts
//


/**
 * Type guard function for string values.
 *
 * @example
 * ```typescript
 * isStr('hello')    // returns true
 * isStr(42)         // returns false
 * isStr('')         // returns true
 * isStr(null)       // returns false
 * isStr(undefined)  // returns false
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a string
 * @category Common Utils
 */
export const isStr = (value: unknown): value is string =>
	typeof value === 'string'


/**
 * Type guard function for string values.
 *
 * @example
 * ```typescript
 * isStr('hello')    // returns true
 * isStr(42)         // returns false
 * isStr('')         // returns true
 * isStr(null)       // returns true
 * isStr(undefined)  // returns true
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a string
 * @category Common Utils
 */
export const isOptionalStr = (value: unknown): value is string | null | undefined =>
	value == null ||
	typeof value === 'string'
