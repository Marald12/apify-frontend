import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "src/assets/styles/variables" as *;
					@use "src/assets/styles/mixins" as *;
				`
			}
		}
	},
	optimizeDeps: {
		include: ['react-json-view']
	}
})
