import { describe, test, expect } from 'vitest'
import { isStr, isNum, isBool } from '@/common'
import { dataGuard } from '@/core'
import { TestUser, validUser, invalidUsers } from './utils/testData'

describe('dataGuard function', () => {
	// Create a guard for TestUser
	const isValidUser = dataGuard<TestUser>(o =>
		isNum(o?.id) &&
    isStr(o?.name) &&
    isStr(o?.email) &&
    isBool(o?.active) &&
    (o?.age === undefined || isNum(o?.age)) &&
    (o?.tags === undefined || Array.isArray(o?.tags) && o.tags.every(isStr)),
	)

	test('accepts valid data', () => {
		expect(isValidUser(validUser)).toBe(true)
	})

	test('accepts valid data with optional fields omitted', () => {
		const userWithoutOptionals = {
			id: 2,
			name: 'Jane Doe',
			email: 'jane@example.com',
			active: true,
		}

		expect(isValidUser(userWithoutOptionals)).toBe(true)
	})

	test('rejects data with missing required fields', () => {
		expect(isValidUser(invalidUsers.missingId)).toBe(false)
	})

	test('rejects data with wrong types', () => {
		expect(isValidUser(invalidUsers.wrongTypes as any)).toBe(false)
	})

	test('rejects empty object', () => {
		expect(isValidUser(invalidUsers.emptyObject)).toBe(false)
	})

	test('rejects null and undefined', () => {
		expect(isValidUser(invalidUsers.nullValue)).toBe(false)
		expect(isValidUser(invalidUsers.undefinedValue)).toBe(false)
	})

	test('rejects non-object values', () => {
		expect(isValidUser(invalidUsers.arrayValue as any)).toBe(false)
		expect(isValidUser(invalidUsers.stringValue as any)).toBe(false)
	})

	test('works with custom complex predicates', () => {
		// A more complex guard with nested validation
		const hasValidAddress = dataGuard<{ address: { city: string, zip: number } }>(o =>
			o?.address !== undefined &&
      isStr(o?.address?.city) &&
      isNum(o?.address?.zip),
		)

		expect(hasValidAddress({ address: { city: 'New York', zip: 10001 } })).toBe(true)
		expect(hasValidAddress({ address: { city: 'New York', zip: '10001' as any } })).toBe(false)
		expect(hasValidAddress({ address: {} as any })).toBe(false)
		expect(hasValidAddress({})).toBe(false)
	})
})
