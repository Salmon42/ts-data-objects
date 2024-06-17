//
//
//

import type { Expect, GuardPredicate, DataModelGuard } from '@/common/types'


// function dataGuardF<T extends object> (predicate: GuardPredicate<T>): (o?: Expect<T>) => o is T {
// return (dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
// }


/**
 * Data model type guard generator
 * @category Core Implementation
 *
 * @template T
 * @param predicate ...
 * @returns ...
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataModelGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
