import { expect, test } from 'vitest'
import { BaseNode } from '@/nontrivial'


test('BaseNode implementation', () => {
	const node = new BaseNode('inj')

	expect(node.injection).toBe('inj')
	expect(node['__classname']).toBe('BaseNode')
})
