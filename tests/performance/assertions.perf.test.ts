import { describe, it } from 'vitest'
import {
	isStr, isOptionalStr,
	isNum, isOptionalNum,
	isBool, isOptionalBool,
	isArrayOf, isOptionalArrayOf,
	isOptionalObject,
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
