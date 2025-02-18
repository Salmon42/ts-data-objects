import { defineObject, isStr, isNum } from '@/main'


export type DefinedExampleData = {
	title: string
	description?: string
	timestamp: number
	pureFrontendAttribute?: string
}


export const {
	DefinedExampleData,
	parseDefinedExampleData,
	validDefinedExampleData,
} = defineObject<DefinedExampleData, 'DefinedExampleData'>('DefinedExampleData', {
	predicate: o => (
		isStr(o?.title) &&
		isNum(o?.timestamp)
	),
	defaultValues: {
		pureFrontendAttribute: 'something',
		title: '',
		timestamp: 0,
	},
})
