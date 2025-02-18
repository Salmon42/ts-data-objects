/**
 * Custom internal error class for data validation failures.
 *
 * Provides detailed error messages when data validation fails, including:
 * - The expected data type name
 * - The actual value that failed validation
 * - Optional details about which specific validation failed
 *
 * @example
 * ```typescript
 * throw new DataValidationError('UserData', invalidData, 'age must be a number')
 * ```
 *
 * @category Common Utils
 */
export class DataValidationError extends Error {
	constructor (
		/** Name of the expected type */
		public dataType: string,
		/** The value that failed validation */
		public value: unknown,
		/** Optional details about the validation failure */
		public detail?: string,
	) {
		const json = JSON.stringify(value, null, 4)
		const additional = detail ? ` Invalid value for [${detail}]` : ''
		super(`Model Validation Error → [${dataType}] {${json}}.${additional}`)
	}
}
