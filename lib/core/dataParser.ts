import type { Expect, DataModelGuard } from '@/common/types'
import { DataValidationError } from '@/common/dataError'
import { DataConstructor } from '@/core/types'


/**
 * ...
 * @category Core Implementation
 *
 * @param dataType
 * @param constructorFunction
 * @param guardFunction
 * @param value
 * @returns
 */
const DataValidation = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataModelGuard<T>,
	value?: Expect<T>,
) => {
	if (guardFunction(value)) {
		return constructorFunction(value)
	}
	else {
		throw new DataValidationError(dataType, value)
	}
}

/**
 * ...
 * @category Core Implementation
 *
 * @param dataType
 * @param constructorFunction
 * @param guardFunction
 * @returns
 */
export const dataParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataModelGuard<T>,
) =>
	(data?: Expect<T>) =>
		DataValidation(dataType, constructorFunction, guardFunction, data)
