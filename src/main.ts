import App from '@/App.vue'
import { App as VueApp, createApp } from 'vue'
// 加载UI库, 引入后组件会被全局注册, 我们在任意组件内都可以直接使用

import '@5a.css/reset';
import '@5a.css/helpers';

// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'

// import * as a from './lib'
// console.log(a);

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';


// function useTable (app: VueApp) {
//     app.use(VXETable)

//     // 给 vue 实例挂载内部对象，例如：
//     // app.config.globalProperties.$XModal = VXETable.modal
//     // app.config.globalProperties.$XPrint = VXETable.print
//     // app.config.globalProperties.$XSaveFile = VXETable.saveFile
//     // app.config.globalProperties.$XReadFile = VXETable.readFile
// }

const app = createApp(App);

// import { Modal } from '@arco-design/web-vue';
// Modal._context = app._context;

// 加载UI
// app.use(Antd);
app.use(ArcoVue, {
    // componentPrefix: ''
});
// app.use(useTable);
app.mount('#app');


