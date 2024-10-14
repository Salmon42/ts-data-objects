import type { Expect, GuardPredicate, DataModelGuard } from '@/common/types'


// function dataGuardF<T extends object> (predicate: GuardPredicate<T>): (o?: Expect<T>) => o is T {
// return (dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
// }


/**
 * Data model type guard generator
 * * Function that generates TypeScript guard function for a given TS interface.
 * * Accepted parameter is a predicate function that would be applied to label a given
 * JS Object a valid data model complying the TS interface
 * * Here is the place where you can use type assertions from common
 *
 * ```
 * ...
 * ```
 *
 * @category Core Implementation
 * @template T
 * @param predicate ...
 * @returns ...
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataModelGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
