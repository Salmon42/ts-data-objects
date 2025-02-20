//
// Composite object asserts - Arrays
// Dev Notes:
//
// In Array.every method, callbackFn is invoked only for array indexes which have assigned values.
// It is not invoked for empty slots in sparse arrays.
// - Solved with expression: Object.keys(arr).length === arr.length
//   - if the lengths are the same, the array is not sparse
//

import { Predicate } from '../types'


/**
 * Checks if a value is an array where every element satisfies the provided predicate
 *
 * @example
 * ```typescript
 * import { isArrayOf, isStr } from 'ts-data-objects'
 *
 * if (isArrayOf(someValue, isStr)) {
 *   someValue.push('someValue is string array')
 * }
 * ```
 *
 * @template T The expected type of array elements
 * @param value - The value to check
 * @param predicate - The type guard function to apply to each array element
 * @returns A type predicate indicating whether the value is an array of type T
 */
export const isArrayOf = <T>(value: unknown, predicate: Predicate<T>): value is Array<T> =>
	Array.isArray(value) &&
	Object.keys(value).length === value.length &&
	(value as Array<T>).every(predicate)


/**
 * Checks if a value is either null, undefined, or an array where every element satisfies the provided predicate
 *
 * @template T The expected type of array elements
 * @param value - The value to check
 * @param predicate - The type guard function to apply to each array element
 * @returns A type predicate indicating whether the value is null, undefined, or an array of type T
 */
export const isOptionalArrayOf = <T>(value: unknown, predicate: Predicate<T>): value is Array<T> | null | undefined =>
	value == null ||
	(
		Array.isArray(value) &&
		Object.keys(value).length === value.length &&
		(value as Array<T>).every(predicate)
	)
