import { dataParser, dataGuard, dataModel } from '@/main'

/**
 * Example data type.
 */
export type ExampleData = {
	first: number
	second: string
	third?: string
}

export const ExampleData = dataModel<ExampleData>({
	first: 10,
	second: '',
	third: 'test',
})

export const isExampleData = dataGuard<ExampleData>(o => (
	typeof o?.first === 'number' &&
	typeof o?.second === 'string'
))

export const parseExampleData = dataParser('ExampleData', ExampleData, isExampleData)
