import { dataParser, dataObject, dataGuard } from '@/main'
import { isNum, isStr } from '@/common'


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


export const isTrivialExampleData = dataGuard<TrivialExampleData>(o => (
	isNum(o?.first) &&
	isStr(o?.second)
))


export const parseExampleData = dataParser(
	'ExampleData',
	TrivialExampleData,
	isTrivialExampleData,
)
