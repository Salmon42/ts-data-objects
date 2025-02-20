import { dataObject } from './dataObject'
import { dataGuard } from './dataGuard'
import { dataParser } from './dataParser'
import type { DefinedObject, DefineObjectParams, NamedConstructor, NamedGuard, NamedParser } from './types'


/**
 * Creates a complete suite of functions for working with typed data objects.
 * Combines object construction, validation, and parsing into a single definition.
 *
 * This function generates:
 * - A constructor function for creating objects with defaults
 * - A type guard function for validation
 * - A parser function for safely handling unknown data
 *
 * All functions are named based on the provided type name:
 * - Constructor: [typeName]
 * - Guard / Validation: is[typeName]
 * - Parser: parse[typeName]
 *
 * @example
 * ```typescript
 * import { defineObject } from 'ts-data-objects/core'
 * import { isStr, isNum } from 'ts-data-objects/common'
 *
 * type UserData = {
 *   name: string
 *   age: number
 *   verified?: boolean
 * }
 *
 * const {
 *   UserData,      // Constructor
 *   isUserData,    // Type guard
 *   parseUserData  // Parser
 * } = defineObject<UserData>('UserData', {
 *   defaultValues: { verified: false },
 *   predicate: o => (
 *     isStr(o?.name) &&
 *     isNum(o?.age)
 *   )
 * })
 *
 * // Usage:
 * const user = UserData({ name: 'John', age: 20 })
 *
 * if (isUserData(someData)) {
 *   // TypeScript now knows `someData` is now `UserData`
 *   console.log(someData)
 * }
 *
 * // if the apiData is correct according to UserData guard, the data is validated
 * try {
 *   const receivedUser = parseUserData(apiData)
 * }
 * catch (e: any) {
 *   // Handle the error...
 * }
 * ```
 *
 * @template Type - The object type to define
 * @template TypeName - The name to use for generated functions
 * @param typeName - Name used to generate function names
 * @param options - Configuration for the object definition, see {@link DefineObjectParams}
 * @returns Object containing named constructor, guard, and parser functions
 * @category Core Implementation
 */
export const defineObject = <Type extends object, TypeName extends string>(typeName: TypeName, options: DefineObjectParams<Type>): DefinedObject<Type, TypeName> => {
	const __constructor = dataObject<Type>(options?.defaultValues)
	const __guard = dataGuard<Type>(options.predicate)
	const __parser = dataParser<Type>(typeName, __constructor, __guard, options.doNotThrow)

	const __namedConstructor = { [`${typeName}`]: __constructor } as NamedConstructor<Type, TypeName>
	const __namedGuard = { [`is${typeName}`]: __guard } as NamedGuard<Type, TypeName>
	const __namedParser = { [`parse${typeName}`]: __parser } as NamedParser<Type, TypeName>

	return {
		...__namedConstructor,
		...__namedGuard,
		...__namedParser,
	}
}
