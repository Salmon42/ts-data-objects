import { describe, it, expect } from 'vitest'
import { isOptionalObject } from '@/common/asserts'

describe('Object type assertions', () => {
	//


	describe('isOptionalObject', () => {
		//
		// type Person = {
		//   name: string
		//   age: number
		// }

		// Define some test predicates
		const isPerson = (value: unknown): value is { name: string; age: number } => {
			return typeof value === 'object' &&
        value != null &&
        'name' in value &&
        'age' in value &&
        typeof (value as any).name === 'string' &&
        typeof (value as any).age === 'number'
		}

		const isEmptyObject = (value: unknown): value is Record<string, never> => {
			return typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length === 0
		}


		it('should return true for objects that match the predicate', () => {
			const person = { name: 'Alice', age: 30 }
			expect(isOptionalObject(person, isPerson)).toBe(true)

			const emptyObj = {}
			expect(isOptionalObject(emptyObj, isEmptyObject)).toBe(true)
		})


		it('should return true for null and undefined regardless of predicate', () => {
			expect(isOptionalObject(null, isPerson)).toBe(true)
			expect(isOptionalObject(undefined, isPerson)).toBe(true)
			expect(isOptionalObject(null, isEmptyObject)).toBe(true)
			expect(isOptionalObject(undefined, isEmptyObject)).toBe(true)
		})


		it('should return false for objects that do not match the predicate', () => {
			const invalidPerson1 = { name: 'Bob' }
			const invalidPerson2 = { age: 25 }
			const invalidPerson3 = { name: 123, age: 30 }

			expect(isOptionalObject(invalidPerson1, isPerson)).toBe(false)
			expect(isOptionalObject(invalidPerson2, isPerson)).toBe(false)
			expect(isOptionalObject(invalidPerson3, isPerson)).toBe(false)

			const nonEmptyObj = { key: 'value' }
			expect(isOptionalObject(nonEmptyObj, isEmptyObject)).toBe(false)
		})


		it('should return false for non-object values that are not null/undefined', () => {
			expect(isOptionalObject(123, isPerson)).toBe(false)
			expect(isOptionalObject('string', isPerson)).toBe(false)
			expect(isOptionalObject(true, isPerson)).toBe(false)
			expect(isOptionalObject([], isPerson)).toBe(false)
			expect(isOptionalObject(() => {}, isPerson)).toBe(false)
		})


		it('should handle edge cases correctly', () => {
			// Arrays are objects in JavaScript
			const arrayPredicate = (value: unknown): value is unknown[] => Array.isArray(value)
			expect(isOptionalObject([], arrayPredicate)).toBe(true)

			// Functions are objects in JavaScript
			// eslint-disable-next-line @typescript-eslint/ban-types
			const functionPredicate = (value: unknown): value is Function => typeof value === 'function'
			expect(isOptionalObject(() => {}, functionPredicate)).toBe(true)

			// Dates are objects
			const datePredicate = (value: unknown): value is Date => value instanceof Date
			expect(isOptionalObject(new Date(), datePredicate)).toBe(true)
		})
	})
})
