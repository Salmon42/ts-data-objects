/**
 * Extended error class for Model Assertion.
 * Convenient for throwing when any object or value
 * is not expected model and we need to ensure the
 * model has all required attributes
 */
export class DataValidationError extends Error {
	constructor (dataType: string, value: unknown) {
		super(`Model Validation error for type [${dataType}] and value ${JSON.stringify(value, null, 4)}`)
	}
}
