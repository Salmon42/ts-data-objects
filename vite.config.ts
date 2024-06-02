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
			entry: resolve(__dirname, 'lib/main.ts'),
			fileName: 'index',
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
