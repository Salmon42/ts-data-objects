import { resolve } from 'node:path'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			include: ['tests/**'],
			exclude: ['tests/utils/**'],
			root: resolve(__dirname),
		},
	}),
)
