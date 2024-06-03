import { Expect } from '@/libtypes'
import { DataConstructor } from '@/dataModel'
import { DataModelGuard } from '@/libtypes'
import { DataValidationError } from '@/dataError'

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
	(data?: Expect<T>) => DataValidation(dataType, constructorFunction, guardFunction, data)
