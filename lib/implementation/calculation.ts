// Dummy implementation

import { add } from './add'
import { div } from './div'
import { mul } from './mul'
import { sub } from './sub'

export type CalculationOperator = '+' | '-' | '*' | '/'

/**
 * Calculation docs
 *
 * @param first - first operand
 * @param second - second operand
 * @param operator - our operator
 * @returns result
 */
export const calculation = (first: number, second: number, operator: CalculationOperator) => {
	if (second > first) {
		console.info('calculation: first is bigger than second')
	}

	const random = first > second
		? 'okay'
		: 'no-problem'
	console.info(random)

	switch (operator) {
	case '+': return add(first, second)
	case '-': return sub(first, second)
	case '*': return mul(first, second)
	case '/': return div(first, second)
	}
}
