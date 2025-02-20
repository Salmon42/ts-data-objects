//
// Boolean Asserts
//


/**
 * Type guard function for boolean values.
 *
 * @example
 * ```typescript
 * isBool(true)       // returns true
 * isBool('true')     // returns false
 * isBool(0)          // returns false
 * isBool(null)       // returns false
 * isBool(undefined)  // returns false
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is a boolean
 * @category Common Utils
 */
export const isBool = (value: unknown): value is boolean =>
	typeof value === 'boolean'


/**
 * Type guard function for optional boolean values
 *
 * @example
 * ```typescript
 * isBool(true)       // returns true
 * isBool('true')     // returns false
 * isBool(0)          // returns false
 * isBool(null)       // returns true
 * isBool(undefined)  // returns true
 * ```
 *
 * @param value - Any value to check
 * @returns Type predicate indicating if the value is boolean or null/undefined
 * @category Common Utils
 */
export const isOptionalBool = (value: unknown): value is boolean | null | undefined =>
	value == null ||
	typeof value === 'boolean'
