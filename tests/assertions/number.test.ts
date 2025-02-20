import { describe, it, expect } from 'vitest'
import { isNum, isOptionalNum } from '@/common/asserts'

describe('Number type assertions', () => {
	//


	describe('isNum', () => {
		//


		it('should return true for number values', () => {
			expect(isNum(0)).toBe(true)
			expect(isNum(42)).toBe(true)
			expect(isNum(-123)).toBe(true)
			expect(isNum(3.14)).toBe(true)
			expect(isNum(Number.MAX_VALUE)).toBe(true)
			expect(isNum(Number.MIN_VALUE)).toBe(true)
		})


		it('should return true for special number values', () => {
			expect(isNum(NaN)).toBe(true)
			expect(isNum(Infinity)).toBe(true)
			expect(isNum(-Infinity)).toBe(true)
		})


		it('should return false for non-number values', () => {
			expect(isNum(null)).toBe(false)
			expect(isNum(undefined)).toBe(false)
			expect(isNum('')).toBe(false)
			expect(isNum('123')).toBe(false)
			expect(isNum(true)).toBe(false)
			expect(isNum(false)).toBe(false)
			expect(isNum({})).toBe(false)
			expect(isNum([])).toBe(false)
			expect(isNum(() => {})).toBe(false)
			expect(isNum(Symbol())).toBe(false)
			expect(isNum(BigInt(123))).toBe(false)
		})


		it('should handle number objects correctly', () => {
			const numberObject = new Number(123)
			expect(isNum(numberObject)).toBe(false)
			expect(isNum(numberObject.valueOf())).toBe(true)
		})
	})


	describe('isOptionalNum', () => {
		//


		it('should return true for number values', () => {
			expect(isOptionalNum(0)).toBe(true)
			expect(isOptionalNum(42)).toBe(true)
			expect(isOptionalNum(-123)).toBe(true)
			expect(isOptionalNum(NaN)).toBe(true)
		})


		it('should return true for null and undefined', () => {
			expect(isOptionalNum(null)).toBe(true)
			expect(isOptionalNum(undefined)).toBe(true)
		})


		it('should return false for other non-number values', () => {
			expect(isOptionalNum('')).toBe(false)
			expect(isOptionalNum('123')).toBe(false)
			expect(isOptionalNum(true)).toBe(false)
			expect(isOptionalNum({})).toBe(false)
			expect(isOptionalNum([])).toBe(false)
			expect(isOptionalNum(() => {})).toBe(false)
		})
	})
})
