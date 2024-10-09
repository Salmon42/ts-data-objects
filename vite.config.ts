import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		eslint(),
		dts({
			insertTypesEntry: true,
			rollupTypes: true,
		}),
	],

	build: {
		sourcemap: true,
		lib: {
			entry: {
				// resolve(__dirname, 'lib/main.ts'),
				common: resolve(__dirname, 'lib/common/index.ts'),
				core: resolve(__dirname, 'lib/core/index.ts'),
				deep: resolve(__dirname, 'lib/deep/index.ts'),
			},
			// fileName: 'index',
			formats: ['es'],
		},
	},

	resolve: {
		alias: {
			'@': resolve(__dirname, 'lib/'),
			'#': resolve(__dirname, 'src/'),
		},
	},
})
