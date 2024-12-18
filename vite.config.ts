import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dirs: ['src/utils/tool'],
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/views/components', 'src/components'],
      dts: true,
      directoryAsNamespace: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  server: {
    cors: true,
    host: '0.0.0.0',
    proxy: {
      '/backapi': {
        target: 'http://127.0.0.1:8888/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backapi/, ''),
      },
    },
  },
});
