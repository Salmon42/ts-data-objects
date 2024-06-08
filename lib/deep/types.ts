//
// ...
//

import type { DataModelGuard, Expect } from '@/core/types'

/**
 * TODO: Single rule
 */
export type DataModelRule = [
	type: 'string' | 'number' | 'boolean' | DataModelRuleList<any>,
	array?: boolean,
]


/**
 * TODO:...
 */
export type DataModelRuleList<T extends object> = ArrayLike<DataModelRule> | {
	[K in keyof T]: DataModelRule
}


/**
 * TODO: ...
 * (tbd) return undefined if validation passed, otherwise return self-ref
 * usable by parser to determine innermost problem of data model
 */
export type DataModelValidator<T extends object> = (o?: Expect<T>) => string | undefined


/**
 * TODO:?
 * holder of guard and validator function
 */
export type DataModelGuards<Type extends object, TypeName extends string> =
	{ [DataTypeName in TypeName as `is${DataTypeName}`]: DataModelGuard<Type> } &
	{ [DataTypeName in TypeName as `valid${DataTypeName}`]: DataModelValidator<Type> } &
	{ [DataTypeName in TypeName as `${DataTypeName}Rules`]: DataModelRuleList<Type> }
