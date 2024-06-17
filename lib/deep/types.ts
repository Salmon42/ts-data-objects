//
// ...
//

import type { DataModelGuard, Expect } from '@/common/types'

/**
 * TODO: Single rule
 * @category Advanced Implementation
 */
export type DataModelRule = [
	type: 'string' | 'number' | 'boolean' | DataModelRuleList<any>,
	array?: boolean,
]


/**
 * TODO:...
 * @category Advanced Implementation
 */
export type DataModelRuleList<T extends object> = ArrayLike<DataModelRule> | {
	[K in keyof T]: DataModelRule
}


/**
 * TODO: ...
 * (tbd) return undefined if validation passed, otherwise return self-ref
 * usable by parser to determine innermost problem of data model
 * @category Advanced Implementation
 */
export type DataModelValidator<T extends object> = (o?: Expect<T>) => string | undefined


/**
 * TODO:?
 * holder of guard and validator function
 * @category Advanced Implementation
 */
export type DataModelGuards<Type extends object, TypeName extends string> =
	{ [DataTypeName in TypeName as `is${DataTypeName}`]: DataModelGuard<Type> } &
	{ [DataTypeName in TypeName as `valid${DataTypeName}`]: DataModelValidator<Type> } &
	{ [DataTypeName in TypeName as `${DataTypeName}Rules`]: DataModelRuleList<Type> }
