//
//
//

import { Expect, DataModelGuard, GuardPredicate } from '@/common/types'

/**
 * ...
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T

export type DefineObjectParams<T extends object> = {
	defaultValues?: T
	predicate: GuardPredicate<T>
	doNotThrow?: boolean
}

export type NamedConstructor<Type extends object, TypeName extends string> =
	{ [N in TypeName as `${N}`]: DataConstructor<Type> }

export type NamedGuard<Type extends object, TypeName extends string> =
	{ [N in TypeName as `valid${N}`]: DataModelGuard<Type> }

export type NamedParser<Type extends object, TypeName extends string> =
	{ [N in TypeName as `parse${N}`]: DataConstructor<Type> }


export type DefinedObject<Type extends object, TypeName extends string> =
	NamedConstructor<Type, TypeName> &
	NamedGuard<Type, TypeName> &
	NamedParser<Type, TypeName>
