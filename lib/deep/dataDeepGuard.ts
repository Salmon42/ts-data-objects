//
//
//

import { Expect } from '@/common/types'
import type {
	DataModelGuards, DataModelRules,
	DeepGuardInnerIsFunction, DeepGuardIsFunction,
	DeepGuardInnerAssertionFunction, DeepGuardAssertionFunction,
	IsFunction, AssertionFunction, DataModelRulesObject,
} from '@/deep/types'


/**
 * data deep functionality
 * @category Advanced Implementation
 *
 * @param typeName
 * @param modelRules
 * @returns
 */
export const dataDeepGuard = <Type extends object, TypeName extends string>(
	typeName: TypeName,
	modelRules: DataModelRules<Type>,
): DataModelGuards<Type, TypeName> => {
	// ~


	/**
	 * TODO: move the interpretation to TS type
	 * Function performing runtime typechecks on unknowingly nested object.
	 *
	 * @param dataObject - source object
	 * @param innerRules - object-like structure combined with tuples.
	 * @returns two functions: is${Type} as guard fn, valid${Type} as assertion fn, ${Type}Rules
	 * as the same rule object passed into this function for convenience
	 */
	const __isFunction: DeepGuardInnerIsFunction<Type> = (dataObject?: Expect<Type>, innerRules?: DataModelRules<any>): dataObject is Type => {
		const rules = innerRules ?? modelRules
		for (const [name, [type, array]] of Object.entries(rules)) {
			const ptr = dataObject[name]
			let result = false

			if (typeof type === 'string') {
				// testing primitive type
				result = array
					? Array.isArray(ptr) && ptr.every(item => (typeof item === type))
					: typeof ptr === type
			}
			else {
				// testing inner datamodel
				result = array
					? Array.isArray(ptr) && ptr.every(item => __isFunction(item, type))
					: __isFunction(ptr, type)
			}

			if (!result) return false
		}
		return true
	}

	/**
	 * reduce the user-available validation function to not contain the second optional argument
	 * because in either way, the first call of validation function is without nesting - innerRules
	 * are undefined
	 */
	const isFunction: DeepGuardIsFunction<Type> = (o): o is Type => __isFunction(o)

	const __validationFunction: DeepGuardInnerAssertionFunction<Type> = (dataObject?: Expect<Type>, innerRules?: DataModelRules<any>): string | undefined => {
		const rules = innerRules ?? modelRules
		for (const [name, [type, array]] of Object.entries(rules)) {
			const ptr = dataObject[name]

			if (typeof type === 'string') {
				// testing primitive type
				if (array) {
					if (! (Array.isArray(ptr) && ptr.every(item => (typeof item === type)))) {
						return `[${name}]: "${ptr}" (invalid array of primitives)`
					}
				}
				else {
					if (! (typeof ptr === type)) {
						return `[${name}]: "${ptr}" (invalid primitive)`
					}
				}
			}
			else {
				// testing inner datamodel
				if (array) {
					if (! Array.isArray(ptr)) return `[${name}]: "${ptr}" (invalid object array)`
					for (const arrItem of ptr) {
						const r = __validationFunction(arrItem, type)
						if (r != null) return r
					}
				}
				else {
					const r = __validationFunction(ptr, type)
					if (r != null) return r
				}
			}
		}
		return undefined
	}

	/**
	 * reduce the user-available validation function to not contain the second optional argument
	 * because in either way, the first call of validation function is without nesting - innerRules
	 * are undefined
	 */
	const validationFunction: DeepGuardAssertionFunction<Type> = o => __validationFunction(o)

	const __is_function = { [`is${typeName}`]: isFunction } as IsFunction<Type, TypeName>
	const __as_function = { [`valid${typeName}`]: validationFunction } as AssertionFunction<Type, TypeName>
	const __model_rules = { [`${typeName}Rules`]: modelRules } as DataModelRulesObject<Type, TypeName>

	return {
		...__is_function,
		...__as_function,
		...__model_rules,
	}
}
