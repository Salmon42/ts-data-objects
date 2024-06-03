/**
 * Extended error class for Model Assertion.
 *
 * Convenient for throwing when any object or value
 * is not expected model and we need to ensure the
 * model has all required attributes
 *
 *
 */
export class DataValidationError extends Error {
	constructor (
		public dataType: string,
		public value: unknown,
		public detail: string = '(not provided)',
	) {
		super(`Model Validation Error → [${dataType}] {${JSON.stringify(value, null, 4)}}. Invalid value for [${detail}]`)
	}
}
