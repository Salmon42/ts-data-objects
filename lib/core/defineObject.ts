import { dataModel } from './dataObject'
import { dataGuard } from './dataGuard'
import { dataParser } from './dataParser'
import type { DefinedObject, DefineObjectParams, NamedConstructor, NamedGuard, NamedParser } from './types'


/**
 * * Composing function constructing functions defining, validating and parsing a JSON object to comply with given TS type.
 *
 * @param typeName - Name of the typed object. Required to enable partial code reflexion due to TypeScript code being removed from built bundle
 * @param options - see {@link DefineObjectParams}
 * @returns functions related to crafting and validating a typed data object
 */
export const defineObject = <Type extends object, TypeName extends string>(typeName: TypeName, options: DefineObjectParams<Type>): DefinedObject<Type, TypeName> => {
	const __constructor = dataModel<Type>(options?.defaultValues)
	const __namedConstructor = { [`${typeName}`]: __constructor } as NamedConstructor<Type, TypeName>

	const __guard = dataGuard<Type>(options.predicate)
	const __namedGuard = { [`valid${typeName}`]: __guard } as NamedGuard<Type, TypeName>

	const __parser = dataParser<Type>(typeName, __constructor, __guard, options.doNotThrow)
	const __namedParser = { [`parse${typeName}`]: __parser } as NamedParser<Type, TypeName>

	return {
		...__namedConstructor,
		...__namedGuard,
		...__namedParser,
	}
}
