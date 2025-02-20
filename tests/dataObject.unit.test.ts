import { describe, test, expect } from 'vitest'
import { dataObject } from '@/core'
import { TestUser, validUser } from './utils/testData'


describe('dataObject function', () => {
	test('creates object with no default values', () => {
		const User = dataObject<TestUser>()
		const result = User(validUser)

		expect(result).toEqual(validUser)
	})

	test('creates empty object when no input and no defaults', () => {
		const User = dataObject<TestUser>()
		const result = User()

		expect(result).toEqual({})
	})

	test('merges input with default values', () => {
		const defaultValues = {
			id: 0,
			name: '',
			email: '',
			active: false,
		}

		const User = dataObject<TestUser>(defaultValues)
		const partialData = { name: 'Jane Doe', email: 'jane@example.com' }
		const result = User(partialData)

		expect(result).toEqual({
			...defaultValues,
			...partialData,
		})
	})

	test('input values override defaults', () => {
		const defaultValues = {
			id: 999,
			name: 'Default Name',
			email: 'default@example.com',
			active: false,
		}

		const User = dataObject<TestUser>(defaultValues)
		const result = User(validUser)

		expect(result).not.toEqual(defaultValues)
		expect(result).toEqual(validUser)
	})

	test('handles undefined input with defaults', () => {
		const defaultValues = {
			id: 0,
			name: 'Guest',
			email: 'guest@example.com',
			active: true,
		}

		const User = dataObject<TestUser>(defaultValues)
		const result = User(undefined)

		expect(result).toEqual(defaultValues)
	})

	test('handles null input properties correctly', () => {
		const User = dataObject<TestUser>({ name: 'Default' })
		const result = User({ name: null as any })

		expect(result.name).toBeNull()
	})
})
