/**
 * A utility function to measure execution time of a function
 * @param fn The function to benchmark
 * @param iterations Number of times to run the function
 * @returns Execution time in milliseconds
 */
export const benchmark = <T>(fn: () => T, iterations: number = 1000000): number => {
	const start = performance.now()
	for (let i = 0; i < iterations; i++) {
		fn()
	}
	return performance.now() - start
}
