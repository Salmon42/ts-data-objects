import { describe, it, expect } from 'vitest'
import { isArrayOf, isOptionalArrayOf, isStr, isNum, isBool } from '@/common/asserts'


describe('Array type assertions', () => {
	//


	describe('isArrayOf', () => {
		//


		it('should return true for arrays with all elements matching the predicate', () => {
			expect(isArrayOf([], isStr)).toBe(true)
			expect(isArrayOf(['a', 'b', 'c'], isStr)).toBe(true)
			expect(isArrayOf([1, 2, 3], isNum)).toBe(true)
			expect(isArrayOf([true, false], isBool)).toBe(true)
		})


		it('should return false if any element does not match the predicate', () => {
			expect(isArrayOf(['a', 1, 'c'], isStr)).toBe(false)
			expect(isArrayOf([1, '2', 3], isNum)).toBe(false)
			expect(isArrayOf([true, 'false'], isBool)).toBe(false)
		})


		it('should return false for non-array values', () => {
			expect(isArrayOf(null, isStr)).toBe(false)
			expect(isArrayOf(undefined, isStr)).toBe(false)
			expect(isArrayOf({}, isStr)).toBe(false)
			expect(isArrayOf('not array', isStr)).toBe(false)
			expect(isArrayOf(123, isNum)).toBe(false)
			expect(isArrayOf(true, isBool)).toBe(false)
		})


		it('should handle complex nested arrays', () => {
			// Custom predicates for testing nested structures
			const isStrArray = (value: unknown): value is string[] => isArrayOf(value, isStr)
			const isNumArray = (value: unknown): value is number[] => isArrayOf(value, isNum)

			// Array of string arrays
			expect(isArrayOf([['a', 'b'], ['c', 'd']], isStrArray)).toBe(true)
			expect(isArrayOf([['a', 'b'], ['c', 1]], isStrArray)).toBe(false)

			// Array of number arrays
			expect(isArrayOf([[1, 2], [3, 4]], isNumArray)).toBe(true)
			expect(isArrayOf([[1, 2], ['3', 4]], isNumArray)).toBe(false)
		})


		it('should handle edge cases', () => {
			// Empty array should pass any predicate
			const impossiblePredicate = (value: unknown): value is never => false
			expect(isArrayOf([], impossiblePredicate)).toBe(true)

			// Array-like objects are not arrays
			const arrayLike = { 0: 'a', 1: 'b', length: 2 }
			expect(isArrayOf(arrayLike, isStr)).toBe(false)

			// Sparse arrays
			// eslint-disable-next-line no-sparse-arrays
			const sparseArray = [1, , 3]
			// This should be false because `undefined` is not a number
			expect(isArrayOf(sparseArray, isNum)).toBe(false)
		})
	})


	describe('isOptionalArrayOf', () => {
		//


		it('should return true for arrays with all elements matching the predicate', () => {
			expect(isOptionalArrayOf([], isStr)).toBe(true)
			expect(isOptionalArrayOf(['a', 'b', 'c'], isStr)).toBe(true)
			expect(isOptionalArrayOf([1, 2, 3], isNum)).toBe(true)
		})


		it('should return true for null and undefined', () => {
			expect(isOptionalArrayOf(null, isStr)).toBe(true)
			expect(isOptionalArrayOf(undefined, isStr)).toBe(true)
			expect(isOptionalArrayOf(null, isNum)).toBe(true)
			expect(isOptionalArrayOf(undefined, isBool)).toBe(true)
		})


		it('should return false if any element does not match the predicate', () => {
			expect(isOptionalArrayOf(['a', 1, 'c'], isStr)).toBe(false)
			expect(isOptionalArrayOf([1, '2', 3], isNum)).toBe(false)
		})


		it('should return false for other non-array values that are not null/undefined', () => {
			expect(isOptionalArrayOf({}, isStr)).toBe(false)
			expect(isOptionalArrayOf('not array', isStr)).toBe(false)
			expect(isOptionalArrayOf(123, isNum)).toBe(false)
			expect(isOptionalArrayOf(true, isBool)).toBe(false)
		})
	})
})
