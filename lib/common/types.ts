//
// Export
//


/**
 * Convenience alias for TypeScript utility type `Partial`. Serves only for semantical purpose
 * @category Common Utils
 */
export type Expect<T> = Partial<T>

/**
 * Signature of predicate function accepting a JSON object with expected type and returns single boolean
 * @category Common Utils
 */
export type GuardPredicate<T extends object> = (o?: Expect<T>) => boolean

/**
 * * Signature of wrapping function that handles predicate of a data object.
 * * As pure predicate wouldn't be able to have assertion return type `returnValue is SomeType`, the predicates are wrapped in 'Guard functions'
 * @category Common Utils
 */
export type DataObjectGuard<T extends object> = (o?: Expect<T>) => o is T
