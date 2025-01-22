import { DataModelGuard, GuardPredicate } from '@/common/types'
import { DataConstructor } from '@/types'
import { dataModel } from './dataModel'
import { dataGuard } from './dataGuard'
import { dataParser } from './dataParser'


export type DefineObjectParams<T extends object> = {
	defaultValues?: T
	predicate: GuardPredicate<T>
	doNotThrow?: boolean
}

type NamedConstructor<Type extends object, TypeName extends string> =
	{ [N in TypeName as `${N}`]: DataConstructor<Type> }

type NamedGuard<Type extends object, TypeName extends string> =
	{ [N in TypeName as `valid${N}`]: DataModelGuard<Type> }

type NamedParser<Type extends object, TypeName extends string> =
	{ [N in TypeName as `parse${N}`]: DataConstructor<Type> }


export type DefinedObject<Type extends object, TypeName extends string> =
	NamedConstructor<Type, TypeName> &
	NamedGuard<Type, TypeName> &
	NamedParser<Type, TypeName>


export const defineObject = <Type extends object, TypeName extends string>(typeName: TypeName, options: DefineObjectParams<Type>): DefinedObject<Type, TypeName> => {
	//
	// ...
	//

	const __constructor = dataModel<Type>(options?.defaultValues)
	const __namedConstructor = { [`${typeName}`]: __constructor } as NamedConstructor<Type, TypeName>

	const __guard = dataGuard<Type>(options.predicate)
	const __namedGuard = { [`valid${typeName}`]: __guard } as NamedGuard<Type, TypeName>

	const __parser = dataParser<Type>(typeName, __constructor, __guard)
	const __namedParser = { [`parse${typeName}`]: __parser } as NamedParser<Type, TypeName>

	return {
		...__namedConstructor,
		...__namedGuard,
		...__namedParser,
	}
}
