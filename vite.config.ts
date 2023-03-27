import path from 'path'
import { defineConfig } from 'vite'
import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import autoRouter from './plugin/auto-router'
import autoApi from './plugin/auto-api'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

interface Servers {
  [propName: string]: string
}

const servers: Servers = {
  prod: 'http://127.0.0.1:3000',
  test: 'http://pandacodgen-demo.icyanstone.com/api',
  yang: 'http://192.168.198.1:6501',
}
const proxyTarget = process.env.npm_config_api || 'test'
const basePath = process.env.npm_config_base || '/'
const mock = Boolean(process.env.npm_config_mock)

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport =>
  defineConfig({
    base: basePath,
    plugins: [
      vue(),
      eslint({
        // fix: true,
        throwOnError: true,
        throwOnWarning: true,
      }),
      {
        ...autoRouter({
          pagesDir: 'src/pages',
          layoutsDir: 'src/layouts',
          routerDir: 'src/router',
        }),
        enforce: 'pre',
      },
      {
        ...autoApi({
          serviceDir: 'src/service',
          apisDir: 'src/service/apis',
        }),
        enforce: 'pre',
      },
      viteMockServe({
        mockPath: 'src/service/mock',
        localEnabled: command === 'serve' && mock,
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '～': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: servers[proxyTarget],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
