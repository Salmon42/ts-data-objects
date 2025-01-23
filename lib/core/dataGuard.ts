import type { Expect, GuardPredicate, DataObjectGuard } from '@/common/types'


/**
 * Data object type guard generator
 * * Function that generates TypeScript guard function for a given TS interface.
 * * Accepted parameter is a predicate function that would be applied to determine
 * whether a given JSON object is complying the TS interface
 * * Here is the place where you can use type assertions from common
 *
 * ```
 * import { dataGuard } from 'ts-data-objects/core'
 * import { isNum, isBool } from 'ts-data-objects/common'
 * type MyData = {
 *   name: string
 *   age?: number
 *   verified: boolean
 * }
 *
 * // Here we define a function predicate, where `o` is the JSON object
 * // and we expect it to contain the attributes of the types we expect
 * const guardFunction = dataGuard<MyData>(o => (
 *   isStr(o?.name) &&
 *   isBool(o?.verified)
 * ))
 *
 * ```
 *
 * @category Core Implementation
 * @template T - the TypeScript type the object should satisfy
 * @param predicate - function that receives the object of expected type to perform type checks on attributes
 * @returns typed guard function that returns `true/false` depending if it passed the predicate
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataObjectGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
