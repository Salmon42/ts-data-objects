import { describe, it, expect, vi } from 'vitest'
import { DataConstructor, DataObjectGuard, Expect } from '@/types'
import { DataValidationError } from '@/common'
import { dataParser } from '@/core'
import { TestData } from './testData'


//
// 1. Valid data scenarios:
// - Complete valid objects
// - Partial valid objects
// - Undefined input (using constructor defaults)
//
// 2. Invalid data handling:
// - Throwing errors when validation fails
// - Logging instead of throwing when doNotThrow is true
// - Proper error message content
//
// 3. Edge cases:
// - Null input
// - Empty objects
// - Objects with extra properties
//


describe('dataParser', () => {
	//


	// Setup mock constructor and guard functions
	const mockConstructor: DataConstructor<TestData> = (data) => ({
		id: data?.id ?? 0,
		name: data?.name ?? '',
		optional: data?.optional,
	})

	const mockGuard: DataObjectGuard<TestData> = (data): data is TestData => {
		return typeof data?.id === 'number' && typeof data?.name === 'string'
	}


	it('should successfully parse valid data', () => {
		const parser = dataParser<TestData>('TestData', mockConstructor, mockGuard)
		const validData = { id: 1, name: 'test' }

		const result = parser(validData)

		expect(result).toEqual({
			id: 1,
			name: 'test',
			optional: undefined,
		})
	})


	it('should handle optional properties', () => {
		const parser = dataParser<TestData>('TestData', mockConstructor, mockGuard)
		const validDataWithOptional = { id: 1, name: 'test', optional: true }

		const result = parser(validDataWithOptional)

		expect(result).toEqual({
			id: 1,
			name: 'test',
			optional: true,
		})
	})


	it('should throw DataValidationError for invalid data', () => {
		const parser = dataParser<TestData>('TestData', mockConstructor, mockGuard)
		const invalidData = { id: 'invalid', name: 123 }

		expect(() => parser(invalidData as any)).toThrow(DataValidationError)
	})


	it('should log error instead of throwing when doNotThrow is true', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
		const parser = dataParser<TestData>('TestData', mockConstructor, mockGuard, true)
		const invalidData = { id: 'invalid', name: 123 }

		parser(invalidData as any)

		expect(consoleSpy).toHaveBeenCalledWith(expect.any(DataValidationError))
		consoleSpy.mockRestore()
	})


	it('should pass partial data to constructor when guard validates', () => {
		const partialData = { id: 1 } as any

		// This assumes the guard is lenient and accepts partial data
		const mockLenientGuard: DataObjectGuard<TestData> = (o?: Expect<TestData>): o is TestData => true
		const lenientParser = dataParser<TestData>('TestData', mockConstructor, mockLenientGuard)

		const result = lenientParser(partialData)

		expect(result).toEqual({
			id: 1,
			name: '',
			optional: undefined,
		})
	})


	it('should include type name in error message', () => {
		const parser = dataParser<TestData>('TestData', mockConstructor, mockGuard)
		const invalidData = { foo: 'bar' }

		expect(() => {
			parser(invalidData as any)
		}).toThrow(DataValidationError)

		// Capture the error to verify its properties
		try {
			parser(invalidData as any)
		}
		catch (error) {
			expect(error instanceof DataValidationError).toBe(true)
			expect((error as DataValidationError).dataType).toBe('TestData')
			expect((error as DataValidationError).value).toEqual(invalidData)
		}
	})
})
