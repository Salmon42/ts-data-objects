import type { Expect } from '@/common/types'
import type { DataConstructor } from './types'


/**
 * Creates a typed constructor function for data objects with optional default values.
 *
 * This function generates a constructor that:
 * - Enforces TypeScript type safety
 * - Merges default values with provided data
 * - Handles partial input data
 *
 *
 * @example
 * ```typescript
 * import { dataObject } from 'ts-data-objects/core'
 *
 * type UserData = {
 *   name: string
 *   age: number
 *   verified?: boolean
 * }
 *
 * // Here you can optionally define any default values
 * // that you might want to be included when parsing JSON data
 * // or just creating JS Object from scratch
 * const User = dataObject<UserData>({
 *   name: '',
 *   verified: false
 * })
 *
 * // Usage:
 * const user = User({ name: "John", age: 20 })
 * // Result: { name: "John", , age: 20, verified: false }
 * ```
 *
 * Notes:
 * - Name collision with TS interface is possible and will work
 *
 * ---
 *
 * @template T - The object type/interface to create a constructor for
 * @param [defaultValues] - Optional default values for the object properties
 * @returns A constructor function that creates objects of type T
 * @category Core Implementation
 */
export const dataObject = <T extends object>(defaultValues?: Expect<T>): DataConstructor<T> =>
	(o: Expect<T>): T => defaultValues
		? ({ ...defaultValues, ...o }) as T
		: o as T
