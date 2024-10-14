import { Expect } from '@/common/types'
import { DataConstructor } from './types'


/**
 * Data model constructor generator.
 * * Requires the developer to define a TypeScript interface/type that will be passed into this function.
 *
 * ```
 * import { dataModel } from 'ts-data-objects/core'
 *
 * type MyData = {
 *   name: string
 *   age: number
 *   verified: boolean
 * }
 *
 * // Name collision with TS interface is intentional
 * // Here you can optionally define any default non-nullish values
 * // that you might want when parsing JSON data or just creating
 * // JS Object from scratch
 * const MyData = dataModel<MyData>({
 *  name: '',
 *  verified: false,
 * })
 *
 * ```
 *
 * @category Core Implementation
 * @template T
 * @param defaultValues supplied default values for any kind of parameters within the {@link T} type
 * @returns data model constructor
 */
export const dataModel = <T extends object>(defaultValues: T): DataConstructor<T> =>
	(o: Expect<T>): T => ({ ...defaultValues, ...o })
