//
//
//

import { Expect, GuardPredicate, DataModelGuard } from '@/libtypes'


// function dataGuardF<T extends object> (predicate: GuardPredicate<T>): (o?: Expect<T>) => o is T {
// return (dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
// }


/**
 * Data model type guard generator
 * @template T
 * @param predicate ...
 * @returns ...
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataModelGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
