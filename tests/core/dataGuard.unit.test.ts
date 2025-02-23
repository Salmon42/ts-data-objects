import { describe, it, expect } from 'vitest'
import { dataGuard } from '@/core'
import { isStr, isNum, isBool } from '@/common'


//
// 1. Basic Type Guards:
// - Simple object validation
// - Optional properties handling
// - Type checking for primitive values
//
// 2. Input Validation:
// - Null and undefined handling
// - Non-object input handling
// - Empty object validation
//
// 3. Complex Type Guards:
// - Nested object structures
// - Deep property validation
// - Multiple level type checking
//
// 4. Array Type Guards:
// - Array of primitives
// - Array of objects
// - Mixed type arrays
// - Array content validation
//
// 5. Union Type Guards:
// - Discriminated unions
// - Multiple variant handling
// - Invalid variant rejection
//
// Edge Cases:
// - Objects with extra properties
// - Objects with null prototype
// - Inherited properties
// - Object class instances
//


describe('dataGuard', () => {
	//


	// Test types
	interface UserData {
		name: string;
		age: number;
		verified?: boolean;
	}

	interface Config {
		apiKey: string;
		maxRetries: number;
		debug?: boolean;
		endpoints?: string[];
	}


	describe('Basic Type Guards', () => {
		//


		it('should create a working type guard for simple objects', () => {
			const isUserData = dataGuard<UserData>(o =>
				isStr(o?.name) &&
				isNum(o?.age),
			)

			expect(isUserData({ name: 'Alice', age: 30 })).toBe(true)
			expect(isUserData({ name: 'Bob', age: 25, verified: true })).toBe(true)
			expect(isUserData({ name: 123 as unknown as string, age: 30 })).toBe(false)
			expect(isUserData({ name: 'Charlie', age: '40' as unknown as number })).toBe(false)
		})


		it('should handle optional properties correctly', () => {
			const isConfig = dataGuard<Config>(o =>
				isStr(o?.apiKey) &&
				isNum(o?.maxRetries),
			)

			expect(isConfig({ apiKey: 'xyz', maxRetries: 3 })).toBe(true)
			expect(isConfig({ apiKey: 'xyz', maxRetries: 3, debug: true })).toBe(true)
			expect(isConfig({ apiKey: 'xyz', maxRetries: 3, endpoints: ['api1', 'api2'] })).toBe(true)
		})
	})


	describe('Input Validation', () => {
		const isUserData = dataGuard<UserData>(o =>
			isStr(o?.name) &&
			isNum(o?.age),
		)


		it('should handle null input', () => {
			expect(isUserData(null)).toBe(false)
		})


		it('should handle undefined input', () => {
			expect(isUserData(undefined)).toBe(false)
		})


		it('should handle non-object input', () => {
			expect(isUserData('string' as any)).toBe(false)
			expect(isUserData(123 as any)).toBe(false)
			expect(isUserData(true as any)).toBe(false)
			expect(isUserData([] as any)).toBe(false)
		})


		it('should reject empty objects', () => {
			expect(isUserData({})).toBe(false)
		})
	})


	describe('Complex Type Guards', () => {
		interface NestedData {
			user: {
				id: number;
				details: {
					firstName: string;
					lastName: string;
				}
			}
			settings: {
				active: boolean;
			}
		}

		const isNestedData = dataGuard<NestedData>(o =>
			typeof o?.user === 'object' && o.user !== null &&
			isNum(o.user.id) &&
			typeof o.user.details === 'object' && o.user.details !== null &&
			isStr(o.user.details.firstName) &&
			isStr(o.user.details.lastName) &&
			typeof o?.settings === 'object' && o.settings !== null &&
			isBool(o.settings.active),
		)

		it('should validate nested object structures', () => {
			const validData = {
				user: {
					id: 1,
					details: {
						firstName: 'John',
						lastName: 'Doe',
					},
				},
				settings: {
					active: true,
				},
			}

			expect(isNestedData(validData)).toBe(true)
		})


		it('should reject invalid nested structures', () => {
			const invalidData1 = {
				user: {
					id: '1', // should be number
					details: {
						firstName: 'John',
						lastName: 'Doe',
					},
				},
				settings: {
					active: true,
				},
			}

			const invalidData2 = {
				user: {
					id: 1,
					details: {
						firstName: 123, // should be string
						lastName: 'Doe',
					},
				},
				settings: {
					active: true,
				},
			}

			expect(isNestedData(invalidData1 as unknown)).toBe(false)
			expect(isNestedData(invalidData2 as unknown)).toBe(false)
		})
	})


	describe('Array Type Guards', () => {
		interface ArrayData {
			tags: string[];
			scores: number[];
			users: Array<{
				id: number;
				name: string;
			}>;
		}

		const isArrayData = dataGuard<ArrayData>(o =>
			Array.isArray(o?.tags) && o.tags.every(isStr) &&
			Array.isArray(o?.scores) && o.scores.every(isNum) &&
			Array.isArray(o?.users) && o.users.every(user =>
				typeof user === 'object' && user !== null &&
				isNum(user.id) &&
				isStr(user.name),
			),
		)


		it('should validate arrays of primitive types', () => {
			const validData = {
				tags: ['test', 'demo'],
				scores: [85, 92, 78],
				users: [
					{ id: 1, name: 'Alice' },
					{ id: 2, name: 'Bob' },
				],
			}

			expect(isArrayData(validData)).toBe(true)
		})


		it('should reject invalid array contents', () => {
			const invalidData1 = {
				tags: ['test', 123], // should be all strings
				scores: [85, 92, 78],
				users: [
					{ id: 1, name: 'Alice' },
					{ id: 2, name: 'Bob' },
				],
			}

			const invalidData2 = {
				tags: ['test', 'demo'],
				scores: [85, '92', 78], // should be all numbers
				users: [
					{ id: 1, name: 'Alice' },
					{ id: '2', name: 'Bob' }, // id should be number
				],
			}

			expect(isArrayData(invalidData1 as unknown)).toBe(false)
			expect(isArrayData(invalidData2 as unknown)).toBe(false)
		})
	})


	describe('Union Type Guards', () => {
		type Shape = {
			kind: 'circle';
			radius: number;
		} | {
			kind: 'rectangle';
			width: number;
			height: number;
		}

		const isShape = dataGuard<Shape>(o => {
			if (o?.kind === 'circle') {
				return isNum(o.radius)
			}
			if (o?.kind === 'rectangle') {
				return isNum(o.width) && isNum(o.height)
			}
			return false
		})


		it('should validate discriminated unions', () => {
			expect(isShape({ kind: 'circle', radius: 5 })).toBe(true)
			expect(isShape({ kind: 'rectangle', width: 10, height: 20 })).toBe(true)
		})


		it('should reject invalid union variants', () => {
			expect(isShape({ kind: 'circle', radius: '5' as unknown as null })).toBe(false)
			expect(isShape({ kind: 'rectangle', width: '10' as unknown as null, height: 20 })).toBe(false)
			expect(isShape({ kind: 'triangle', base: 10, height: 20 } as unknown)).toBe(false)
		})
	})


	describe('Nonexisting Guard implementation', () => {
		it('should let empty object pass the empty guard definition', () => {
			const nonExistentGuard = dataGuard(() => true)

			expect(nonExistentGuard({})).toBe(true)
		})
	})


	describe('Edge Cases', () => {
		interface MinimalData {
			key: string;
		}

		const isMinimalData = dataGuard<MinimalData>(o => isStr(o?.key))


		it('should handle objects with extra properties', () => {
			expect(isMinimalData({ key: 'value', extra: 'ignored' } as unknown)).toBe(true)
		})


		it('should handle Object.create(null)', () => {
			const nullPrototype = Object.create(null)
			nullPrototype.key = 'value'
			expect(isMinimalData(nullPrototype)).toBe(true)
		})


		it('should handle inherited properties', () => {
			class DataClass {
				key: string = 'value'
			}
			expect(isMinimalData(new DataClass())).toBe(true)
		})
	})
})
