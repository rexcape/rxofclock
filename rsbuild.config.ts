import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    pluginReact(),
    pluginMdx({
      mdxLoaderOptions: {
        remarkPlugins: [remarkGfm],
      },
    }),
  ],
})
