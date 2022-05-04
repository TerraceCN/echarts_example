import { createApp } from 'vue';
import ECharts from 'vue-echarts';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import App from './App.vue';

use([CanvasRenderer]);

createApp(App).component('v-chart', ECharts).mount('#app');
