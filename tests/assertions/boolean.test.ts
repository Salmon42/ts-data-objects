import { describe, it, expect } from 'vitest'
import { isBool, isOptionalBool } from '@/common/asserts'


describe('Boolean type assertions', () => {
	//

	describe('isBool', () => {
		//


		it('should return true for boolean values', () => {
			expect(isBool(true)).toBe(true)
			expect(isBool(false)).toBe(true)
			expect(isBool(Boolean(1))).toBe(true)
			expect(isBool(Boolean(0))).toBe(true)
		})


		it('should return false for non-boolean values', () => {
			expect(isBool(null)).toBe(false)
			expect(isBool(undefined)).toBe(false)
			expect(isBool(0)).toBe(false)
			expect(isBool(1)).toBe(false)
			expect(isBool('')).toBe(false)
			expect(isBool('true')).toBe(false)
			expect(isBool({})).toBe(false)
			expect(isBool([])).toBe(false)
			expect(isBool(() => {})).toBe(false)
			expect(isBool(Symbol())).toBe(false)
			expect(isBool(NaN)).toBe(false)
		})


		it('should handle boolean objects correctly', () => {
			const boolObject = new Boolean(true)
			expect(isBool(boolObject)).toBe(false)
			expect(isBool(boolObject.valueOf())).toBe(true)
		})
	})

	describe('isOptionalBool', () => {
		//


		it('should return true for boolean values', () => {
			expect(isOptionalBool(true)).toBe(true)
			expect(isOptionalBool(false)).toBe(true)
		})


		it('should return true for null and undefined', () => {
			expect(isOptionalBool(null)).toBe(true)
			expect(isOptionalBool(undefined)).toBe(true)
		})


		it('should return false for other non-boolean values', () => {
			expect(isOptionalBool(0)).toBe(false)
			expect(isOptionalBool(1)).toBe(false)
			expect(isOptionalBool('')).toBe(false)
			expect(isOptionalBool('true')).toBe(false)
			expect(isOptionalBool({})).toBe(false)
			expect(isOptionalBool([])).toBe(false)
		})
	})
})
