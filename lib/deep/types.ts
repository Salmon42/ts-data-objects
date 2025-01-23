//
// ...
//

import type { Expect } from '@/common/types'


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  --- Is-Function definitions
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * TODO~
 * Type Definition for Deep Guard isFunction.
 * The advanced variant
 */
export type DeepGuardInnerIsFunction<T extends object> = (
	dataObject: Expect<T>,
	innerRules?: DataModelRules<any>
) => dataObject is T


/**
 * TODO~
 */
export type DeepGuardIsFunction<T extends object> = (
	dataObject: Expect<T>
) => dataObject is T


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  --- Validate-Assert-Function
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * TODO~
 * ...
 * @category Advanced/Experimental Implementation
 */
export type DeepGuardInnerAssertionFunction<T extends object> = (
	dataObject?: Expect<T>,
	innerRules?: DataModelRules<any>
) => string | undefined


/**
 * TODO: ...
 * (tbd) return undefined if validation passed, otherwise return self-ref
 * usable by parser to determine innermost problem of data model
 * @category Advanced/Experimental Implementation
 */
export type DeepGuardAssertionFunction<T extends object> = (o?: Expect<T>) => string | undefined


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  --- Type Rules to be checked
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * TODO: Single rule
 *
 * Named tuple
 *
 * @category Advanced/Experimental Implementation
 */
export type DataModelRule = [
	type: 'string' | 'number' | 'boolean' | DataModelRules<any>,
	array?: boolean,
]


/**
 * TODO:...
 * @category Advanced/Experimental Implementation
 */
export type DataModelRules<T extends object> = | // Either Array of rules, or mapped object of rules
	// ArrayLike<DataModelRule> |
	{ [K in keyof T]: DataModelRule }


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  --- Assembly sub-objects for returning object of DeepGuard
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * Scaffolder for is${Type} function.
 * @see {@link DeepGuardIsFunction}
 * @see {@link DeepGuardInnerIsFunction}
 *
 * @category Advanced/Experimental Implementation
 */
export type IsFunction<Type extends object, TypeName extends string> =
	{ [DataTypeName in TypeName as `is${DataTypeName}`]: DeepGuardIsFunction<Type> }


/**
 * Scaffolder for valid${Type} function
 * @see {@link DeepGuardAssertionFunction}
 * @see {@link DeepGuardInnerAssertionFunction}
 *
 * @category Advanced/Experimental Implementation
 */
export type AssertionFunction<Type extends object, TypeName extends string> =
{ [DataTypeName in TypeName as `valid${DataTypeName}`]: DeepGuardAssertionFunction<Type> }


/**
 * Scaffolder for ${Type}Rules object.
 * This object is basically just a convenience returning of the same object passed into DeepGuard generator.
 * @see {@link DataModelRules}
 *
 * @category Advanced/Experimental Implementation
 */
export type DataModelRulesObject<Type extends object, TypeName extends string> =
{ [DataTypeName in TypeName as `${DataTypeName}Rules`]: DataModelRules<Type> }


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  --- Object that is returned from our DeepGuard generator function.
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * TODO:?
 * holder of guard and validator function
 *
 * @category Advanced/Experimental Implementation
 */
export type DataModelGuards<Type extends object, TypeName extends string> =
	IsFunction<Type, TypeName> &
	AssertionFunction<Type, TypeName> &
	DataModelRulesObject<Type, TypeName>
