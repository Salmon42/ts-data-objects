//
//
//


// Define test types
export interface Person {
	name: string;
	age: number;
	email?: string;
}

export interface Config {
	darkMode: boolean;
	fontSize: number;
	theme: string;
}


// Sample type for testing
export interface TestData {
	id: number
	name: string
	optional?: boolean
}
