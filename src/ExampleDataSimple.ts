//
// Use Case of ts-data-objects/core & common
//

import { dataGuard, isNum, isStr, isBool, dataObject, dataParser } from '@/main'


export type ExampleData = {
	name: string
	age: number
	verified: boolean
	extra?: string
}


export const ExampleData = dataObject<ExampleData>({
	name: 'John Doe',
	age: 20,
	verified: false,
})


export const ExampleDataGuard = dataGuard<ExampleData>(o => (
	isStr(o?.name) &&
	isNum(o?.age) &&
	isBool(o?.verified)
	// Put any custom logic here
))


export const parseExampleData = dataParser('ExampleData', ExampleData, ExampleDataGuard)
