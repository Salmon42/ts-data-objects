import { DataValidationError } from '@/common/dataError'
import type { Expect, DataObjectGuard } from '@/common/types'
import type { DataConstructor } from '@/core/types'


/**
 * Internal implementation of the data parsing logic.
 * Validates and constructs typed objects from unknown data.
 *
 * @template T - The type to validate and construct
 * @param dataType - Name of the type for error reporting
 * @param constructorFunction - Function to construct the final object (returned by `dataObject()`)
 * @param guardFunction - Function to validate the input data (the one obtained from `dataGuard()`)
 * @param doNotThrow - Whether to log errors instead of throwing
 * @param [value] - The input data to parse
 * @returns A validated and constructed object of type T
 * @throws {DataValidationError} When validation fails and doNotThrow is false
 * @category Core Implementation
 */
const DPI = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataObjectGuard<T>,
	doNotThrow: boolean,
	value?: Expect<T>,
) => {
	if (guardFunction(value)) {
		return constructorFunction(value)
	}
	else {
		const error = new DataValidationError(dataType, value)
		if (doNotThrow) {
			console.error(error)
		}
		else {
			throw error
		}
	}
}


/**
 * Creates a type-safe parser that validates and constructs data objects.
 *
 * Combines validation and construction into a single function that:
 * - Validates input data against type constraints
 * - Constructs a proper typed object if valid
 * - Handles validation failures
 *
 * @example
 * ```typescript
 * import { dataParser } from 'ts-data-objects/core'
 *
 * type UserData = {
 *   name: string
 *   age: number
 *   verified?: boolean
 * }
 *
 * // ... with defined constructor and data guard ...
 *
 * const parseUser = dataParser<UserData>(
 *   'UserData',
 *   UserData,        // constructor from dataObject
 *   isUserData,      // guard from dataGuard
 * )
 *
 * // Usage:
 * const user = parseUser(someData) // throws if invalid
 * // If the code continues, it was successfully parsed
 * console.log(user.name)
 * ```
 *
 * @template T - The type to parse into
 * @param dataType - Type name for error messages
 * @param constructorFunction - Object constructor function (returned by `dataObject()`)
 * @param guardFunction - Type guard function (returned by `dataGuard()`)
 * @param [doNotThrow=false] - If true, logs errors instead of throwing
 * @returns A function that parses unknown data into type T
 * @category Core Implementation
 */
export const dataParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataObjectGuard<T>,
	doNotThrow?: boolean,
): DataConstructor<T> =>
	(data?: Expect<T>) => DPI(dataType, constructorFunction, guardFunction, doNotThrow ?? false, data)
