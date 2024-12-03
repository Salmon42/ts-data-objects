import { DataValidationError } from '@/common/dataError'
import { DataConstructor } from '@/core/types'
import type { Expect } from '@/common/types'
import type { DeepGuardAssertionFunction } from '@/deep/types'


/**
 * data deep validation
 * @category Advanced Implementation
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
	validationFunction: DeepGuardAssertionFunction<T>,
	value?: Expect<T>,
) => {
	const result = validationFunction(value)
	if (!result) {
		return constructorFunction(value)
	}
	else {
		throw new DataValidationError(dataType, value, result)
	}
}

/**
 * ...
 * @category Advanced Implementation
 *
 * @param dataType
 * @param constructorFunction
 * @param validationFunction
 * @returns
 */
export const dataDeepParser = <T extends object>(
	dataType: string,
	constructorFunction: DataConstructor<T>,
	validationFunction: DeepGuardAssertionFunction<T>,
) =>
	(data?: Expect<T>) => DataValidation(dataType, constructorFunction, validationFunction, data)


// update dataparser na dmg2 ... nejak ponechat vsetky implementacie idealne
// a moze byt nejaka future verzia oneho. datamodelgiantgeneratora
