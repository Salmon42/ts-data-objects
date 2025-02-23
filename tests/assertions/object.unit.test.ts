import { describe, it, expect } from 'vitest'
import { isObject, isOptionalObject } from '@/common/asserts'

describe('Object type assertions', () => {
	//


	describe('isObject', () => {
		// Test predicates


		const isPerson = (value: unknown): value is { name: string; age: number } => {
			return typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'age' in value &&
        typeof (value as any).name === 'string' &&
        typeof (value as any).age === 'number'
		}

		const hasNameProperty = (value: any): boolean =>
			'name' in value && typeof value.name === 'string'


		it('should return true for valid objects matching the predicate', () => {
			const person = { name: 'Alice', age: 30 }
			expect(isObject(person, isPerson)).toBe(true)
			expect(isObject(person, hasNameProperty)).toBe(true)
		})


		it('should return false for null', () => {
			expect(isObject(null, isPerson)).toBe(false)
			expect(isObject(null, hasNameProperty)).toBe(false)
		})


		it('should return false for undefined', () => {
			expect(isObject(undefined, isPerson)).toBe(false)
			expect(isObject(undefined, hasNameProperty)).toBe(false)
		})


		it('should return false for non-object values', () => {
			expect(isObject('string', isPerson)).toBe(false)
			expect(isObject(42, isPerson)).toBe(false)
			expect(isObject(true, isPerson)).toBe(false)
			expect(isObject(Symbol(), isPerson)).toBe(false)
		})


		it('should return false for objects not matching the predicate', () => {
			const invalidPerson = { name: 123, age: '30' }
			expect(isObject(invalidPerson, isPerson)).toBe(false)
		})


		it('should work with arrays as objects', () => {
			const arrayPredicate = (value: unknown): value is unknown[] => Array.isArray(value)
			expect(isObject([], arrayPredicate)).toBe(true)
			expect(isObject([1, 2, 3], arrayPredicate)).toBe(true)
			expect(isObject({}, arrayPredicate)).toBe(false)
		})


		it('should work with Date objects', () => {
			const isDate = (value: unknown): value is Date => value instanceof Date
			const date = new Date()
			expect(isObject(date, isDate)).toBe(true)
			expect(isObject({}, isDate)).toBe(false)
		})


		it('should handle complex nested objects', () => {
			interface NestedObject {
				user: {
					details: {
						name: string;
						settings: {
							theme: string;
						};
					};
				};
			}

			const isNestedObject = (value: unknown): value is NestedObject => {
				try {
					const obj = value as NestedObject
					return typeof obj.user.details.name === 'string' &&
                 typeof obj.user.details.settings.theme === 'string'
				}
				catch {
					return false
				}
			}

			const validNested = {
				user: {
					details: {
						name: 'Alice',
						settings: {
							theme: 'dark',
						},
					},
				},
			}

			const invalidNested = {
				user: {
					details: {
						name: 'Alice',
						settings: {
							theme: 123, // invalid type
						},
					},
				},
			}

			expect(isObject(validNested, isNestedObject)).toBe(true)
			expect(isObject(invalidNested, isNestedObject)).toBe(false)
		})


		it('should work with class instances', () => {
			class TestClass {
				constructor (public name: string) {}
			}

			const isTestClass = (value: unknown): value is TestClass => value instanceof TestClass
			const instance = new TestClass('test')

			expect(isObject(instance, isTestClass)).toBe(true)
			expect(isObject({name: 'test'}, isTestClass)).toBe(false)
		})


		it('should handle objects with null prototype', () => {
			const obj = Object.create(null)
			obj.name = 'test'

			expect(isObject(obj, hasNameProperty)).toBe(true)
		})
	})


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
			expect(isOptionalObject(() => {}, functionPredicate)).toBe(false)

			// Dates are objects
			const datePredicate = (value: unknown): value is Date => value instanceof Date
			expect(isOptionalObject(new Date(), datePredicate)).toBe(true)
		})
	})
})
