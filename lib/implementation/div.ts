/**
 * Summary of function div
 * @param a some info on param a in div
 * @param b some info on param b in div
 */
export const div = (a: number, b: number) => {
	if (b === 0) return Infinity
	return a / b
}
