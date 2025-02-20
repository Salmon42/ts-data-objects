import { describe, it, expect } from 'vitest'
import { isStr, isOptionalStr } from '@/common/asserts'

describe('String type assertions', () => {
	//


	describe('isStr', () => {
		//


		it('should return true for string values', () => {
			expect(isStr('')).toBe(true)
			expect(isStr('hello')).toBe(true)
			expect(isStr('template string')).toBe(true)
			expect(isStr(String('constructed'))).toBe(true)
		})


		it('should return false for non-string values', () => {
			expect(isStr(null)).toBe(false)
			expect(isStr(undefined)).toBe(false)
			expect(isStr(123)).toBe(false)
			expect(isStr(0)).toBe(false)
			expect(isStr(NaN)).toBe(false)
			expect(isStr(true)).toBe(false)
			expect(isStr(false)).toBe(false)
			expect(isStr({})).toBe(false)
			expect(isStr([])).toBe(false)
			expect(isStr(() => {})).toBe(false)
			expect(isStr(Symbol())).toBe(false)
			expect(isStr(BigInt(123))).toBe(false)
		})


		it('should handle string objects correctly', () => {
			// Note: new String() creates a String object, not a primitive string
			const stringObject = new String('test')
			expect(isStr(stringObject)).toBe(false)
			expect(isStr(stringObject.valueOf())).toBe(true)
		})
	})


	describe('isOptionalStr', () => {
		it('should return true for string values', () => {
			expect(isOptionalStr('')).toBe(true)
			expect(isOptionalStr('hello')).toBe(true)
			expect(isOptionalStr('template string')).toBe(true)
		})


		it('should return true for null and undefined', () => {
			expect(isOptionalStr(null)).toBe(true)
			expect(isOptionalStr(undefined)).toBe(true)
		})


		it('should return false for other non-string values', () => {
			expect(isOptionalStr(123)).toBe(false)
			expect(isOptionalStr(0)).toBe(false)
			expect(isOptionalStr(true)).toBe(false)
			expect(isOptionalStr({})).toBe(false)
			expect(isOptionalStr([])).toBe(false)
			expect(isOptionalStr(() => {})).toBe(false)
		})
	})
})
