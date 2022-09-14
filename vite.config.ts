import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import autoImport from 'unplugin-auto-import/vite'
import setupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      resolvers: [
        ArcoResolver({
          importStyle: 'less',
        }),
      ],
    }),
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
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {  
          // 'primary-6': `rgb(var(~'@{arco-cssvars-prefix}-green-6'))`,
          // 'dark-primary-6': `rgb(var(~'@{arco-cssvars-prefix}-orange-6'))`, 
          // 'primary-6': `rgb(var(~'@{arco-cssvars-prefix}-green-6'))`,
          // 'dark-primary-6': `rgb(var(~'@{arco-cssvars-prefix}-orange-6'))`,
          // 'arcoblue-6': '#f85959',
          hack: `true; @import  (reference) "${path.resolve('src/assets/styles/color.less')}";`,
        },
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
