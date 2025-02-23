import { describe, it } from 'vitest'
import {
	isStr, isOptionalStr,
	isNum, isOptionalNum,
	isBool, isOptionalBool,
	isArrayOf, isOptionalArrayOf,
	isOptionalObject,
	isObject,
} from '@/common/asserts'
import { benchmark } from '../utils/performanceTest'


describe('Type Assertions Performance', () => {
	// Skip these tests by default since they're for benchmarking


	it('should benchmark primitive type assertions', () => {
		// Prepare test values
		const stringValue = 'test string'
		const numberValue = 42
		const boolValue = true

		// Benchmark string assertions
		const strTime = benchmark(() => isStr(stringValue))
		const optStrTime = benchmark(() => isOptionalStr(stringValue))

		// Benchmark number assertions
		const numTime = benchmark(() => isNum(numberValue))
		const optNumTime = benchmark(() => isOptionalNum(numberValue))

		// Benchmark boolean assertions
		const boolTime = benchmark(() => isBool(boolValue))
		const optBoolTime = benchmark(() => isOptionalBool(boolValue))

		console.info('\n== Primitive Type Assertions Performance ==')
		console.info(`isStr: ${strTime.toFixed(2)}ms`)
		console.info(`isOptionalStr: ${optStrTime.toFixed(2)}ms`)
		console.info(`isNum: ${numTime.toFixed(2)}ms`)
		console.info(`isOptionalNum: ${optNumTime.toFixed(2)}ms`)
		console.info(`isBool: ${boolTime.toFixed(2)}ms`)
		console.info(`isOptionalBool: ${optBoolTime.toFixed(2)}ms`)
	})


	it('should benchmark array assertions', () => {
		// Prepare test arrays
		const emptyArray: any[] = []
		const smallStringArray = ['a', 'b', 'c', 'd', 'e']
		const mediumStringArray = Array(100).fill('test')
		const largeStringArray = Array(1000).fill('test')

		// Benchmark empty array
		const emptyArrayTime = benchmark(() => isArrayOf(emptyArray, isStr), 100000)
		const optEmptyArrayTime = benchmark(() => isOptionalArrayOf(emptyArray, isStr), 100000)

		// Benchmark small array
		const smallArrayTime = benchmark(() => isArrayOf(smallStringArray, isStr), 100000)
		const optSmallArrayTime = benchmark(() => isOptionalArrayOf(smallStringArray, isStr), 100000)

		// Benchmark medium array
		const mediumArrayTime = benchmark(() => isArrayOf(mediumStringArray, isStr), 10000)
		const optMediumArrayTime = benchmark(() => isOptionalArrayOf(mediumStringArray, isStr), 10000)

		// Benchmark large array (fewer iterations)
		const largeArrayTime = benchmark(() => isArrayOf(largeStringArray, isStr), 1000)
		const optLargeArrayTime = benchmark(() => isOptionalArrayOf(largeStringArray, isStr), 1000)

		console.info('\n=== Array Assertions Performance ===')
		console.table([
			['Empty array', 'isArrayOf', `${emptyArrayTime.toFixed(2)}ms`],
			['Empty array', 'isOptionalArrayOf', `${optEmptyArrayTime.toFixed(2)}ms`],
			['Small array (5 items)', 'isArrayOf', `${smallArrayTime.toFixed(2)}ms`],
			['Small array (5 items)', 'isOptionalArrayOf', `${optSmallArrayTime.toFixed(2)}ms`],
			['Medium array (100 items)', 'isArrayOf', `${mediumArrayTime.toFixed(2)}ms`],
			['Medium array (100 items)', 'isOptionalArrayOf', `${optMediumArrayTime.toFixed(2)}ms`],
			['Large array (1000 items)', 'isArrayOf', `${largeArrayTime.toFixed(2)}ms`],
			['Large array (1000 items)', 'isOptionalArrayOf', `${optLargeArrayTime.toFixed(2)}ms`],
		])
	})


	it('should benchmark object assertions', () => {
		// Define test predicates
		const isPerson = (value: unknown): value is { name: string; age: number } => {
			return typeof value === 'object' &&
				value !== null &&
				'name' in value &&
				'age' in value &&
				typeof (value as any).name === 'string' &&
				typeof (value as any).age === 'number'
		}

		// Test objects
		const validPerson = { name: 'Alice', age: 30 }
		const invalidPerson = { name: 'Bob', age: '30' }
		const nullValue = null

		// Benchmark with valid object
		const validObjTime = benchmark(() => isOptionalObject(validPerson, isPerson), 100000)

		// Benchmark with invalid object (will fail predicate check)
		const invalidObjTime = benchmark(() => isOptionalObject(invalidPerson, isPerson), 100000)

		// Benchmark with null (early return)
		const nullObjTime = benchmark(() => isOptionalObject(nullValue, isPerson), 100000)

		console.info('\n=== Object Assertions Performance ===')
		console.table([
			['Valid object', 'isOptionalObject', `${validObjTime.toFixed(2)}ms`],
			['Invalid object', 'isOptionalObject', `${invalidObjTime.toFixed(2)}ms`],
			['Null value', 'isOptionalObject', `${nullObjTime.toFixed(2)}ms`],
		])
	})


	it('should compare performance of nested array checks', () => {
		// Define nested array structures
		const smallNestedArray = [['a'], ['b'], ['c']]
		const mediumNestedArray = Array(10).fill(0).map(() => Array(10).fill('test'))

		// Define custom predicates
		const isStrArray = (value: unknown): value is string[] => isArrayOf(value, isStr)

		// Manual implementation without using isArrayOf
		const manualIsArrayOfArrays = (value: unknown): value is string[][] => {
			if (!Array.isArray(value)) return false
			return value.every(item => Array.isArray(item) && item.every(subItem => typeof subItem === 'string'))
		}

		// Benchmark small nested array
		const smallNestedComposed = benchmark(
			() => isArrayOf(smallNestedArray, isStrArray),
			10000,
		)
		const smallNestedManual = benchmark(
			() => manualIsArrayOfArrays(smallNestedArray),
			10000,
		)

		// Benchmark medium nested array
		const mediumNestedComposed = benchmark(
			() => isArrayOf(mediumNestedArray, isStrArray),
			1000,
		)
		const mediumNestedManual = benchmark(
			() => manualIsArrayOfArrays(mediumNestedArray),
			1000,
		)

		console.info('\n=== Nested Array Checks Performance ===')
		console.table([
			['Small nested array', 'Composed functions', `${smallNestedComposed.toFixed(2)}ms`],
			['Small nested array', 'Manual implementation', `${smallNestedManual.toFixed(2)}ms`],
			['Medium nested array', 'Composed functions', `${mediumNestedComposed.toFixed(2)}ms`],
			['Medium nested array', 'Manual implementation', `${mediumNestedManual.toFixed(2)}ms`],
		])
	})
})


describe('Object Assertions Performance', () => {
	it('should benchmark isObject with different predicates and object sizes', () => {
		// Simple predicate and object
		const simpleObject = { name: 'test' }
		const simplePredicate = (v: any): boolean => 'name' in v

		// Complex predicate and object
		const complexObject = {
			id: 1,
			user: {
				name: 'test',
				email: 'test@example.com',
				settings: {
					theme: 'dark',
					notifications: true,
					preferences: {
						language: 'en',
						timezone: 'UTC',
						features: ['feature1', 'feature2', 'feature3'],
					},
				},
			},
			metadata: {
				created: new Date(),
				modified: new Date(),
				tags: ['tag1', 'tag2', 'tag3'],
			},
		}

		const complexPredicate = (v: any): boolean => {
			try {
				return typeof v.id === 'number' &&
					typeof v.user.name === 'string' &&
					typeof v.user.email === 'string' &&
					typeof v.user.settings.theme === 'string' &&
					typeof v.user.settings.notifications === 'boolean' &&
					Array.isArray(v.user.settings.preferences.features) &&
					Array.isArray(v.metadata.tags)
			}
			catch {
				return false
			}
		}

		// Array object and predicate
		const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `item${i}` }))
		const arrayPredicate = (v: any): boolean =>
			Array.isArray(v) && v.every(item =>
				typeof item === 'object' &&
				item !== null &&
				typeof item.id === 'number' &&
				typeof item.value === 'string',
			)

		// Run benchmarks
		console.info('\n=== Object Assertion Performance Tests ===')

		// Test with simple object and predicate
		const simpleTime = benchmark(() => isObject(simpleObject, simplePredicate))
		console.info(`Simple object check: ${simpleTime.toFixed(2)}ms`)

		// Test with invalid input for simple predicate
		const simpleInvalidTime = benchmark(() => isObject(null, simplePredicate))
		console.info(`Simple object check (invalid input): ${simpleInvalidTime.toFixed(2)}ms`)

		// Test with complex object and predicate
		const complexTime = benchmark(() => isObject(complexObject, complexPredicate))
		console.info(`Complex object check: ${complexTime.toFixed(2)}ms`)

		// Test with complex object and invalid data
		const invalidComplex = { ...complexObject, user: { name: 123 } }
		const complexInvalidTime = benchmark(() => isObject(invalidComplex, complexPredicate))
		console.info(`Complex object check (invalid data): ${complexInvalidTime.toFixed(2)}ms`)

		// Test with large array
		const arrayTime = benchmark(() => isObject(largeArray, arrayPredicate), 1000)
		console.info(`Large array check (1000 items): ${arrayTime.toFixed(2)}ms`)

		// Test with type predicate vs boolean predicate
		type TestObject = { name: string; value: number }
		const typePredicate = (v: unknown): v is TestObject =>
			typeof v === 'object' &&
			v !== null &&
			'name' in v &&
			'value' in v &&
			typeof (v as any).name === 'string' &&
			typeof (v as any).value === 'number'

		const boolPredicate = (v: any): boolean =>
			typeof v === 'object' &&
			v !== null &&
			typeof v.name === 'string' &&
			typeof v.value === 'number'

		const testObj = { name: 'test', value: 42 }

		const typePredicateTime = benchmark(() => isObject(testObj, typePredicate))
		const boolPredicateTime = benchmark(() => isObject(testObj, boolPredicate))

		console.info(`Type predicate check: ${typePredicateTime.toFixed(2)}ms`)
		console.info(`Boolean predicate check: ${boolPredicateTime.toFixed(2)}ms`)

		// Error handling performance
		const errorProne = (v: any): boolean => {
			try {
				return v.deeply.nested.property.exists === true
			}
			catch {
				return false
			}
		}

		const errorProneTime = benchmark(() => isObject({}, errorProne))
		console.info(`Error handling check: ${errorProneTime.toFixed(2)}ms`)
	})
})
