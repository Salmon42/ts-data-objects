import type { Expect } from '@/common/types'
import type { DataConstructor } from './types'


/**
 * Core data object constructor generator.
 * * Requires the developer to define a TypeScript interface/type that will be passed into this function.
 *
 * ```
 * import { dataObject } from 'ts-data-objects/core'
 *
 * type MyData = {
 *   name: string
 *   age: number
 *   verified: boolean
 * }
 *
 * // Name collision with TS interface is possible and will work
 * // Here you can optionally define any default non-nullish values
 * // that you might want when parsing JSON data or just creating
 * // JS Object from scratch
 * const MyData = dataObject<MyData>({
 *  name: '',
 *  verified: false,
 * })
 *
 * ```
 *
 * @category Core Implementation
 * @template T - the TypeScript type the object should satisfy
 * @param defaultValues - supplied values for any kind of parameters within the {@link T} type
 * @returns data model constructor
 */
export const dataObject = <T extends object>(defaultValues?: T): DataConstructor<T> =>
	(o: Expect<T>): T => defaultValues ? ({ ...defaultValues, ...o }) : o as T
