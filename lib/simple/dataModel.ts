import { Expect } from '@/core/types'


/**
 * ...
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T


/**
 * Data model constructor generator
 * @template T
 * @param defaultValues supplied default values for any kind of parameters within the {@link T} type
 * @returns data model constructor
 */
export const dataModel = <T extends object>(defaultValues: T): DataConstructor<T> =>
	(o: Expect<T>): T => ({ ...defaultValues, ...o })
