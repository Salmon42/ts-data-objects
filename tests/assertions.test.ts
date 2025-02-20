import { describe, test, expect } from 'vitest'
import { isBool, isNum, isStr } from '@/common'


describe('Type assertion utilities', () => {
	describe('isBool()', () => {
		test('identifies true as boolean', () => {
			expect(isBool(true)).toBe(true)
		})

		test('identifies false as boolean', () => {
			expect(isBool(false)).toBe(true)
		})

		test('rejects number as boolean', () => {
			expect(isBool(0)).toBe(false)
			expect(isBool(1)).toBe(false)
		})

		test('rejects string as boolean', () => {
			expect(isBool('true')).toBe(false)
			expect(isBool('false')).toBe(false)
		})

		test('rejects null and undefined as boolean', () => {
			expect(isBool(null)).toBe(false)
			expect(isBool(undefined)).toBe(false)
		})

		test('rejects objects and arrays as boolean', () => {
			expect(isBool({})).toBe(false)
			expect(isBool([])).toBe(false)
		})
	})

	describe('isNum()', () => {
		test('identifies integers as numbers', () => {
			expect(isNum(0)).toBe(true)
			expect(isNum(42)).toBe(true)
			expect(isNum(-1)).toBe(true)
		})

		test('identifies floating point as numbers', () => {
			expect(isNum(3.14)).toBe(true)
			expect(isNum(-0.5)).toBe(true)
		})

		test('identifies NaN as number', () => {
			expect(isNum(NaN)).toBe(true)
		})

		test('identifies Infinity as number', () => {
			expect(isNum(Infinity)).toBe(true)
			expect(isNum(-Infinity)).toBe(true)
		})

		test('rejects string as number', () => {
			expect(isNum('42')).toBe(false)
		})

		test('rejects boolean as number', () => {
			expect(isNum(true)).toBe(false)
			expect(isNum(false)).toBe(false)
		})

		test('rejects null and undefined as number', () => {
			expect(isNum(null)).toBe(false)
			expect(isNum(undefined)).toBe(false)
		})

		test('rejects objects and arrays as number', () => {
			expect(isNum({})).toBe(false)
			expect(isNum([])).toBe(false)
		})
	})

	describe('isStr()', () => {
		test('identifies empty string as string', () => {
			expect(isStr('')).toBe(true)
		})

		test('identifies text as string', () => {
			expect(isStr('hello')).toBe(true)
			expect(isStr('42')).toBe(true)
			expect(isStr('true')).toBe(true)
		})

		test('rejects number as string', () => {
			expect(isStr(42)).toBe(false)
			expect(isStr(0)).toBe(false)
		})

		test('rejects boolean as string', () => {
			expect(isStr(true)).toBe(false)
			expect(isStr(false)).toBe(false)
		})

		test('rejects null and undefined as string', () => {
			expect(isStr(null)).toBe(false)
			expect(isStr(undefined)).toBe(false)
		})

		test('rejects objects and arrays as string', () => {
			expect(isStr({})).toBe(false)
			expect(isStr([])).toBe(false)
		})
	})
})
