import type { Expect, DataObjectGuard, GuardPredicate } from '@/common/types'

/**
 * Core data object constructor function signature
 * @category Core Implementation
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T


/**
 * Param object type definition for data object composing function
 * @category Core Implementation
 */
export type DefineObjectParams<T extends object> = {
	defaultValues?: T
	predicate: GuardPredicate<T>
	doNotThrow?: boolean
}


/**
 * Part of {@link DefinedObject}.
 * * Named constructor would be simply named after the parameter value when the object definition is invoked
 * @category Core Implementation
 */
export type NamedConstructor<Type extends object, TypeName extends string> =
	{ [N in TypeName as `${N}`]: DataConstructor<Type> }


/**
 * Part of {@link DefinedObject}.
 * * Named guard function uses the name of the object name defined by developer, prefixed with `valid`
 * @category Core Implementation
 */
export type NamedGuard<Type extends object, TypeName extends string> =
	{ [N in TypeName as `valid${N}`]: DataObjectGuard<Type> }


/**
 * Part of {@link DefinedObject}.
 * * Named parser function uses the name of the object name defined by developer, prefixed with `parse`
 * @category Core Implementation
 */
export type NamedParser<Type extends object, TypeName extends string> =
	{ [N in TypeName as `parse${N}`]: DataConstructor<Type> }


/**
 * Return object of `defineObject` composing function to be used with destructuring
 * * Combined parts with {@link NamedConstructor}, {@link NamedGuard} and {@link NamedParser}
 *
 * @category Core Implementation
 */
export type DefinedObject<Type extends object, TypeName extends string> =
	NamedConstructor<Type, TypeName> &
	NamedGuard<Type, TypeName> &
	NamedParser<Type, TypeName>
