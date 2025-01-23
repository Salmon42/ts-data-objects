import { dataObject } from '@/core'
import { dataDeepGuard, dataDeepParser } from '@/deep'


export type TrivialExampleData = {
	first: number
	second: string
	third?: string
}


export const TrivialExampleData = dataObject<TrivialExampleData>({
	first: 10,
	second: '',
	third: 'test',
})


export const { isTrivialExampleData, validTrivialExampleData, TrivialExampleDataRules } = dataDeepGuard<TrivialExampleData, 'TrivialExampleData'>('TrivialExampleData', {
	first: ['number'],
	second: ['string'],
})


export const parseTrivialExampleData = dataDeepParser<TrivialExampleData>('TrivialExampleData', TrivialExampleData, validTrivialExampleData)
