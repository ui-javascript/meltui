import { Message } from '@arco-design/web-vue';
import axios from 'axios';

const http = axios.create({
    // 配置
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.response.use(function (response) {
    return response;
    
}, function (error) {
    Message.error(`网络故障(${error.response.status}), 请重试`);

    return Promise.reject(error);
});

export default http;

