/**
 * Extended error class for Model Assertion.
 *
 * Convenient for throwing when any object or value
 * is not expected model and we need to ensure the
 * model has all required attributes
 *
 * @category Common Utils
 */
export class DataValidationError extends Error {
	constructor (
		public dataType: string,
		public value: unknown,
		public detail?: string,
	) {
		const json = JSON.stringify(value, null, 4)
		const additional = detail ? ` Invalid value for [${detail}]` : ''
		super(`Model Validation Error → [${dataType}] {${json}}.${additional}`)
	}
}
