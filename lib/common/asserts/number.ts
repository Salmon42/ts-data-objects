//
// Number Asserts
//


/**
 * Type guard function for number values.
 *
 * @example
 * ```typescript
 * isNum(42)         // returns true
 * isNum('42')       // returns false
 * isNum(NaN)        // returns true - but will not occur in JSON data
 * isNum(null)       // returns false
 * isNum(undefined)  // returns false
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a number
 * @category Common Utils
 */
export const isNum = (value: unknown): value is number =>
	typeof value === 'number'


/**
 * Type guard function for optional number values.
 *
 * @example
 * ```typescript
 * isNum(42)         // returns true
 * isNum('42')       // returns false
 * isNum(NaN)        // returns true
 * isNum(null)       // returns true
 * isNum(undefined)  // returns true
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a number
 * @category Common Utils
 */
export const isOptionalNum = (value: unknown): value is number | null | undefined =>
	value == null ||
	typeof value === 'number'
