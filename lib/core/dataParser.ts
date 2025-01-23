import { DataValidationError } from '@/common/dataError'
import type { Expect, DataObjectGuard } from '@/common/types'
import type { DataConstructor } from '@/core/types'


/**
 * Data parser implementation
 * * Private implementation hidden within exported dataParser function
 *
 * @category Core Implementation
 *
 * @template T - the TypeScript type the object should satisfy
 * @param dataType - stringified name of the TS type
 * @param constructorFunction - the function returned by `dataObject()`
 * @param guardFunction - the function returned by `dataGuard()`
 * @param doNotThrow - defaults to false
 * @param value - the actual unknown JSON object
 * @returns JSON object that has been validated and its value is either original or reconstructed depending on default values of the data object
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
 * Core JSON data parser
 *
 * @category Core Implementation
 *
 * @template T - the TypeScript type the object should satisfy
 * @param dataType - stringified name of the TS type
 * @param constructorFunction - the function returned by `dataObject()`
 * @param guardFunction - the function returned by `dataGuard()`
 * @param doNotThrow - default behavior is to throw error on incorrect validation, you can disable it here with `true`
 * @returns parsing function that validates JSON object, otherwise throws or logs error (depending on `doNotThrow` param)
 */
export const dataParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataObjectGuard<T>,
	doNotThrow?: boolean,
): DataConstructor<T> =>
	(data?: Expect<T>) => DPI(dataType, constructorFunction, guardFunction, doNotThrow ?? false, data)
