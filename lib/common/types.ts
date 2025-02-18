//
// Exported common types.
//


/**
 * A semantic alias for TypeScript's `Partial<T>` utility type.
 * Makes code more readable by explicitly indicating expected partial input.
 *
 * @template T - The type to make partial
 * @category Common Utils
 */
export type Expect<T> = Partial<T>


/**
 * Type signature for predicate functions that validate JSON objects.
 * Used to check if a partial object matches expected type constraints.
 *
 * @template T - The object type to validate
 * @param [o] - Optional partial input data to validate
 * @returns Boolean indicating whether the input satisfies type constraints
 * @category Common Utils
 */
export type GuardPredicate<T extends object> = (o?: Expect<T>) => boolean


/**
 * Type signature for type guard functions that provide TypeScript type assertions.
 *
 * Note:
 * - As pure predicate wouldn't be able to have assertion return type `returnValue is SomeType`, the predicates are wrapped in guard assertions
 *
 * @template T - The object type to guard
 * @param [o] - Optional partial input data to check
 * @returns Type predicate asserting the input is of type T
 * @category Common Utils
 */
export type DataObjectGuard<T extends object> = (o?: Expect<T>) => o is T
