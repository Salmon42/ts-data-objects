import { Expect } from '@/common/types'
import { DataConstructor } from './types'


/**
 * Data model constructor generator
 * @category Core Implementation
 *
 * @template T
 * @param defaultValues supplied default values for any kind of parameters within the {@link T} type
 * @returns data model constructor
 */
export const dataModel = <T extends object>(defaultValues: T): DataConstructor<T> =>
	(o: Expect<T>): T => ({ ...defaultValues, ...o })
