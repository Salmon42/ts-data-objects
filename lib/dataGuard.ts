//
//
//

import { Expect } from '@/libtypes'


/**
 * ...
 */
export type GuardPredicate<T extends object> = (o?: Expect<T>) => boolean

/**
 * ...
 */
export type DataModelGuard<T extends object> = (o?: Expect<T>) => o is T


// function dataGuardF<T extends object> (predicate: GuardPredicate<T>): (o?: Expect<T>) => o is T {
// 	return (dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
// }


/**
 * Data model type guard generator
 * @template T
 * @param predicate ...
 * @returns ...
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataModelGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
