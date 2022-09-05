import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import autoImport from 'unplugin-auto-import/vite'
import setupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({}),
    autoImport({
    imports: [
      'vue',
      'vue-router',
      {
        'vue': [
          'defineProps',
          'defineEmits',
          'defineExpose',
          'withDefaults'
        ]
      },
      // 'pinia'
    ]
  }), setupExtend()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@c": resolve(__dirname, "./src/components"),
    },
  },
})
