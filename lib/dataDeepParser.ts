import { Expect } from '@/libtypes'
import { DataConstructor } from '@/dataModel'
import { DataModelValidator } from '@/dataDeepGuard'
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
	guardFunction: DataModelValidator<T>,
	value?: Expect<T>,
) => {
	const guardResult = guardFunction(value)
	if (!guardResult) {
		return constructorFunction(value)
	}
	else {
		throw new DataValidationError(dataType, value, guardResult)
	}
}

export const dataDeepParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	validationFunction: DataModelValidator<T>,
) =>
	(data?: Expect<T>) => DataValidation(dataType, constructorFunction, validationFunction, data)


// update dataparser na dmg2 ... nejak ponechat vsetky implementacie idealne
// a moze byt nejaka future verzia oneho. datamodelgiantgeneratora
