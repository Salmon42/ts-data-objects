//
// ...
//


/**
 * Expect ...
 * @category Common Utils
 */
export type Expect<T> = Partial<T>

/**
 * GuardPredicate...
 * @category Common Utils
 */
export type GuardPredicate<T extends object> = (o?: Expect<T>) => boolean

/**
 * DataModelGuard...
 * @category Common Utils
 */
export type DataModelGuard<T extends object> = (o?: Expect<T>) => o is T
