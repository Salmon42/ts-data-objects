import type { Expect, DataObjectGuard, GuardPredicate } from '@/common/types'


/**
 * Type signature for data object constructor functions.
 * Creates a function that accepts partial data and returns complete typed objects.
 * @template T - The object type to be constructed
 * @param [o] - Optional partial input data
 * @returns A complete object of type T
 * @category Core Implementation
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * Configuration parameters for creating a complete data object definition.
 *
 * @template T - The type of object being defined
 * @property [defaultValues] - Optional default values for object properties
 * @property predicate - Validation function for type checking
 * @property [doNotThrow] - Whether to suppress validation errors
 * @category Core Implementation
 */
export type DefineObjectParams<T extends object> = {
	defaultValues?: T
	predicate: GuardPredicate<T>
	doNotThrow?: boolean
}


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * Creates a named constructor function type using the provided type name.
 * - Example: For name "User", creates { User: (data?) => UserType }
 * - Part of {@link DefinedObject}.
 * @category Core Implementation
 */
export type NamedConstructor<Type extends object, TypeName extends string> =
	{ [N in TypeName as `${N}`]: DataConstructor<Type> }


/**
 * Creates a named type guard function type with 'valid' prefix.
 * - Example: For name "User", creates { validUser: (data?) => data is UserType }
 * - Part of {@link DefinedObject}.
 * @category Core Implementation
 */
export type NamedGuard<Type extends object, TypeName extends string> =
	{ [N in TypeName as `valid${N}`]: DataObjectGuard<Type> }


/**
 * Creates a named parser function type with 'parse' prefix.
 * - Example: For name "User", creates { parseUser: (data?) => UserType }
 * - Part of {@link DefinedObject}.
 * @category Core Implementation
 */
export type NamedParser<Type extends object, TypeName extends string> =
	{ [N in TypeName as `parse${N}`]: DataConstructor<Type> }


// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
// ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---


/**
 * Complete object definition combining constructor, guard, and parser functions.
 * Provides a unified interface for working with typed data objects.
 * - Combined parts with {@link NamedConstructor}, {@link NamedGuard} and {@link NamedParser}
 *
 * @template Type - The object type being defined
 * @template TypeName - The name to use for generated functions
 * @category Core Implementation
 */
export type DefinedObject<Type extends object, TypeName extends string> =
	NamedConstructor<Type, TypeName> &
	NamedGuard<Type, TypeName> &
	NamedParser<Type, TypeName>
