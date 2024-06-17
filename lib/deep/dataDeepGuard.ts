//
//
//

import { Expect } from '@/common/types'
import type { DataModelGuards, DataModelRuleList } from '@/deep/types'


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
