import type { Expect, DataModelGuard } from '@/core/types'
import { DataValidationError } from '@/core/dataError'
import { DataConstructor } from '@/simple/dataModel'


/**
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

export const dataParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	guardFunction: DataModelGuard<T>,
) =>
	(data?: Expect<T>) =>
		DataValidation(dataType, constructorFunction, guardFunction, data)
