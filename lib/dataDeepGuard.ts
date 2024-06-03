//
//
//

import { DataModelGuard, Expect } from '@/libtypes'


/**
 * TODO: Single rule
 */
export type DataModelRule = [type: 'string' | 'number' | 'boolean' | DataModelRuleList<any>, array?: boolean]


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


export const dataDeepGuard = <Type extends object, TypeName extends string>(
	typeName: TypeName,
	modelRules: DataModelRuleList<Type>,
): DataModelGuards<Type, TypeName> => {
	const isFunction = (dataObject?: Expect<Type>, innerRules?: DataModelRuleList<any>): dataObject is Type => {
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
					? Array.isArray(ptr) && ptr.every(item => isFunction(item, type))
					: isFunction(ptr, type)
			}

			if (!result) return false
		}
		return true
	}

	const validationFunction = (dataObject?: Expect<Type>, innerRules?: DataModelRuleList<any>): string | undefined => {
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
						const r = validationFunction(arrItem, type)
						if (r != null) return r
					}
				}
				else {
					const r = validationFunction(ptr, type)
					if (r != null) return r
				}
			}
		}
		return undefined
	}

	return {
		[`is${typeName}`]: isFunction,
		[`valid${typeName}`]: validationFunction,
		[`${typeName}Rules`]: modelRules,
	} as DataModelGuards<Type, TypeName>
}
