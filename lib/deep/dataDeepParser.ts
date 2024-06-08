import { DataValidationError } from '@/core/dataError'
import { DataConstructor } from '@/simple/types'
import type { Expect } from '@/core/types'
import type { DataModelValidator } from '@/deep/types'


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
