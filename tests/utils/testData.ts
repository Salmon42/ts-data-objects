// Sample type for testing
export type TestUser = {
	id: number;
	name: string;
	email: string;
	active: boolean;
	age?: number;
	tags?: string[];
}

// Valid test data
export const validUser: TestUser = {
	id: 1,
	name: 'John Doe',
	email: 'john@example.com',
	active: true,
	age: 30,
	tags: ['admin', 'user'],
}

// Invalid test data
export const invalidUsers = {
	missingId: {
		name: 'Jane Doe',
		email: 'jane@example.com',
		active: true,
	},
	wrongTypes: {
		id: '1', // string instead of number
		name: 42, // number instead of string
		email: true, // boolean instead of string
		active: 'yes', // string instead of boolean
	},
	emptyObject: {},
	nullValue: null,
	undefinedValue: undefined,
	arrayValue: ['not', 'an', 'object'],
	stringValue: 'not an object',
}
