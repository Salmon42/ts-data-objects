import { DataValidationError } from '@/common/dataError'
import type { DataConstructor } from '@/core/types'
import type { Expect } from '@/common/types'
import type { DeepGuardAssertionFunction } from '@/deep/types'


/**
 * data deep validation
 * @category Experimental Implementation
 *
 * @param dataType
 * @param constructorFunction
 * @param guardFunction
 * @param value
 * @returns
 */
const DPI = <T extends object>(
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
 * @category Experimental Implementation
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
	(data?: Expect<T>) => DPI(dataType, constructorFunction, validationFunction, data)


// dev note
// update dataparser na dmg2 ... nejak ponechat vsetky implementacie idealne
// a moze byt nejaka future verzia oneho. datamodelgiantgeneratora
