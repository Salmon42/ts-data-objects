/**
 * Something informative about ExampleData
 */
export type ExampleData = {
	text: string
	num: number
}

export const ExampleData = (o?: Partial<ExampleData>): ExampleData => ({
	num: o?.num ?? 0,
	text: o?.text ?? '',
})
