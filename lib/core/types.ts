//
// ...
//


/**
 * ...
 */
export type Expect<T> = Partial<T>

/**
 * ...
 */
export type GuardPredicate<T extends object> = (o?: Expect<T>) => boolean

/**
 * ...
 */
export type DataModelGuard<T extends object> = (o?: Expect<T>) => o is T
