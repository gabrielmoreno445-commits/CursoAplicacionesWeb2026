import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    resolve: {
      alias: {
        'astro/entrypoints/prerender': fileURLToPath(
          new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url),
        ),
      },
    },
  },
})
