// ...

/**
 * Extended error class for Model Assertion.
 * Convenient for throwing when any object or value is not expected model.
 * * Used via {@link ModelValidation} function
 */
class ObjectValidationError extends Error {
	constructor (dataType: string, value: unknown) {
		super(`Model Validation error for type [${dataType}] and value ${JSON.stringify(value, null, 4)}`)
	}
}

// Expects ~ Partial naming convention
type Expect<T extends object> = Partial<T>
type E<T extends object> = Expect<T>

type ObjectConstructor<T extends object> = (o?: E<T>) => T
type OC<T extends object> = ObjectConstructor<T>

const dataModel = <T extends object>(defaultValues: T) =>
	(o: E<T>): T => ({ ...defaultValues, ...o })

// TODO: test variant with nested required objects (stated by different constructor)


type GuardPredicate<T extends object> = (o?: E<T>) => boolean

type ObjectGuard<T extends object> = (o?: E<T>) => o is T
type OG<T extends object> = ObjectGuard<T>


function dataGuard<T extends object> (predicate: GuardPredicate<T>): (o?: E<T>) => o is T {
	return (dataObject?: E<T>): dataObject is T => predicate(dataObject)
}


const ObjectValidation = <T extends object>(dataType: string, constructorFunction: OC<T>, guardFunction: OG<T>, value?: E<T>) => {
	if (guardFunction(value)) {
		return constructorFunction(value)
	}
	else {
		throw new ObjectValidationError(dataType, value)
	}
}

const dataParser = <T extends object>(dataType: string, constructorFunction: OC<T>, guardFunction: OG<T>) =>
	(data?: E<T>) => ObjectValidation(dataType, constructorFunction, guardFunction, data)


export {
	dataModel,
	dataParser,
	dataGuard,
}

export type {
	Expect,
	E,
	ObjectConstructor,
	OC,
	ObjectGuard,
	OG,
}
