import type { Expect, GuardPredicate, DataObjectGuard } from '@/common/types'


/**
 * Creates a TypeScript type guard function for runtime type validation.
 *
 * Generates a type-safe validation function that:
 * - Performs runtime type checking
 * - Provides TypeScript type assertions
 * - Supports partial input validation based on predicate
 *
 *
 * @example
 * ```typescript
 * import { dataGuard } from 'ts-data-objects/core'
 * import { isStr, isNum } from 'ts-data-objects/common'
 *
 * type UserData = {
 *   name: string
 *   age: number
 *   verified?: boolean
 * }
 *
 * // Here we define a function predicate, where `o` is the JSON object
 * // and we expect it to contain the attributes of the types we expect
 * const isUserData = dataGuard<UserData>(o => (
 *   isStr(o?.name) &&
 *   isNum(o?.age)
 * ))
 *
 * // Usage:
 * if (isUserData(someData)) {
 *   //TypeScript now knows `someData` is `UserData`
 *   console.log(someData.name)
 * }
 * ```
 *
 * @template T - The object type to create a guard for
 * @param predicate - Validation function that checks type constraints
 * @returns A type guard function that asserts input is of type T
 * @category Core Implementation
 */
export const dataGuard = <T extends object>(predicate: GuardPredicate<T>): DataObjectGuard<T> =>
	(dataObject?: Expect<T>): dataObject is T => predicate(dataObject)
