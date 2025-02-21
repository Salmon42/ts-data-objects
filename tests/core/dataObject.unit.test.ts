import { describe, it, expect } from 'vitest'
import { dataObject } from '@/core'
import { Person, Config } from './testData'

//
// 1. Basic Functionality:
// - Verifying that the function returns a constructor function
// - Testing object creation with provided values
//
//
// 2. Default Values Handling:
// - Using default values when provided
// - Merging defaults with partial provided values
// - Overriding defaults with provided values
// - Returning defaults when input is null/undefined
//
// 3. Input Edge Cases:
// - Handling null and undefined inputs
// - Handling empty object inputs
// - Preserving additional properties not specified in the type
//
// 4. Complex Object Scenarios:
// - Working with nested objects
// - Handling complex object hierarchies
//
// 5. The tests demonstrate that the dataObject function correctly:
// - Creates a constructor function based on the generic type
// - Applies default values when provided
// - Merges default values with input data (using shallow merging)
// - Handles edge cases like null/undefined input appropriately
//


describe('dataObject', () => {
	//


	it('should return a function that constructs objects', () => {
		const createPerson = dataObject<Person>()
		expect(typeof createPerson).toBe('function')
	})


	it('should create empty object when no input and no defaults', () => {
		const Person = dataObject<Person>()
		const result = Person()

		expect(result).toEqual({})
	})


	it('should construct an object with the provided values', () => {
		const createPerson = dataObject<Person>()
		const person = createPerson({ name: 'Alice', age: 30 })

		expect(person).toEqual({ name: 'Alice', age: 30 })
	})


	it('should use default values when provided', () => {
		const defaultPerson = { name: 'Unknown', age: 0 }
		const createPerson = dataObject<Person>(defaultPerson)

		const person = createPerson({ name: 'Bob', age: 25 })
		expect(person).toEqual({ name: 'Bob', age: 25 })
	})


	it('should merge defaults with provided values', () => {
		const defaultPerson = { name: 'Unknown', age: 0, email: 'default@example.com' }
		const createPerson = dataObject<Person>(defaultPerson)

		// Only providing partial data
		const person = createPerson({ name: 'Carol' })
		expect(person).toEqual({ name: 'Carol', age: 0, email: 'default@example.com' })
	})


	it('should override defaults with provided values', () => {
		const defaultConfig = { darkMode: false, fontSize: 14, theme: 'light' }
		const createConfig = dataObject<Config>(defaultConfig)

		const config = createConfig({ darkMode: true, fontSize: 16, theme: 'dark' })
		expect(config).toEqual({ darkMode: true, fontSize: 16, theme: 'dark' })
	})


	it('should handle null input by returning an empty object when no defaults', () => {
		const createPerson = dataObject<Person>()
		const person = createPerson(null)

		expect(person).toEqual({})
	})


	it('should handle undefined input by returning an empty object when no defaults', () => {
		const createPerson = dataObject<Person>()
		const person = createPerson(undefined)

		expect(person).toEqual({})
	})


	it('should return defaults when input is null', () => {
		const defaultPerson = { name: 'Unknown', age: 0 }
		const createPerson = dataObject<Person>(defaultPerson)

		const person = createPerson(null)
		expect(person).toEqual(defaultPerson)
	})


	it('should return defaults when input is undefined', () => {
		const defaultConfig = { darkMode: false, fontSize: 14, theme: 'light' }
		const createConfig = dataObject<Config>(defaultConfig)

		const config = createConfig(undefined)
		expect(config).toEqual(defaultConfig)
	})


	it('should handle empty object input', () => {
		const defaultPerson = { name: 'Unknown', age: 0 }
		const createPerson = dataObject<Person>(defaultPerson)

		const person = createPerson({})
		expect(person).toEqual(defaultPerson)
	})


	it('should preserve additional properties in input that are not in the type', () => {
		interface SimpleObject {
			a: number;
			b: string;
		}

		const createObject = dataObject<SimpleObject>()

		// TypeScript would normally error on this, but the test is checking runtime behavior
		const input = { a: 1, b: 'text', c: true } as any
		const result = createObject(input)

		expect(result).toEqual({ a: 1, b: 'text', c: true })
	})


	it('should work with nested objects', () => {
		interface NestedObject {
			info: {
				id: number;
				details: {
					description: string;
				};
			};
			status: string;
		}

		const defaultNested = {
			info: {
				id: 0,
				details: {
					description: 'Default description',
				},
			},
			status: 'pending',
		}

		const createNested = dataObject<NestedObject>(defaultNested)

		// The spread operator doesn't do a deep merge, so we're testing the expected behavior
		const result = createNested({
			info: {
				id: 123,
				details: {
					description: 'New description',
				},
			},
		})

		// The entire info object is replaced, not deeply merged
		expect(result).toEqual({
			info: {
				id: 123,
				details: {
					description: 'New description',
				},
			},
			status: 'pending',
		})
	})


	it('should handle complex object hierarchies', () => {
		interface ComplexObject {
			users: Array<{id: number, name: string}>;
			settings: {
				notifications: boolean;
				privacy: {
					isPublic: boolean;
					showEmail: boolean;
				};
			};
		}

		const defaultComplex: ComplexObject = {
			users: [],
			settings: {
				notifications: true,
				privacy: {
					isPublic: false,
					showEmail: false,
				},
			},
		}

		const createComplex = dataObject<ComplexObject>(defaultComplex)

		const result = createComplex({
			users: [{id: 1, name: 'Admin'}],
			settings: {
				notifications: false,
				privacy: {
					isPublic: true,
					showEmail: true,
				},
			},
		})

		expect(result).toEqual({
			users: [{id: 1, name: 'Admin'}],
			settings: {
				notifications: false,
				privacy: {
					isPublic: true,
					showEmail: true,
				},
			},
		})
	})
})
