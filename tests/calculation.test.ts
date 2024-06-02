import { expect, test } from 'vitest'
import { calculation } from '@/implementation'

test('calculation', () => {
	expect(calculation(10, 10, '*')).toBe(100)
})
