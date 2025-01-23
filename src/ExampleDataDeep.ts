import { dataObject, dataDeepGuard, dataDeepParser } from '@/main'


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


export const { ExampleDataRules, isExampleData, validExampleData } = dataDeepGuard<ExampleData, 'ExampleData'>('ExampleData', {
	name: ['string'],
	age: ['number'],
	verified: ['boolean'],
})


export const parseExampleData = dataDeepParser('ExampleData', ExampleData, validExampleData)
