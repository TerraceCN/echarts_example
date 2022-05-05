<template>
  <a-layout>
    <a-layout-header>
      <div class="logo">
        Apache ECharts 演示
      </div>
    </a-layout-header>

    <a-layout-content class="content">
      <h1>扬州2021年日气温</h1>
      <temp-line />
      
      <h1>扬州2021年月平均气温</h1>
      <avg-temp-bar />

      <h1>扬州2021年天气类型统计</h1>
      <weather-pie />

      <h1>象形表</h1>
      <speed-graph />

      <h1>文字动画</h1>
      <text-animation />

      <h1>自定义系列</h1>
      <wind-vector />

      <a-button type="dashed" block @click="moreExample">更多样例</a-button>
    </a-layout-content>

    <a-layout-footer style="text-align: center; color: #b5b5b5;">
      <p>Apache Echarts 演示</p>
      <p>
        数据来源：
        <a style="color: inherit;" href="http://www.tianqihoubao.com" target="_blank">
          天气后报网
        </a>
      </p>
      <p>组员：<b>张珂元</b>、吴宇馨、胡坤帅、季姣艳、林典、刘毅</p>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TempLine from './components/TempLine.vue';
import AvgTempBar from './components/AvgTempBar.vue';
import WeatherPie from './components/WeatherPie.vue';
import SpeedGraph from './components/SpeedGraph.vue';
import TextAnimation from './components/TextAnimation.vue';
import WindVector from './components/WindVector.vue';

export default defineComponent({
  components: {
    TempLine,
    AvgTempBar,
    WeatherPie,
    SpeedGraph,
    TextAnimation,
    WindVector,
  },
  setup() {
    function moreExample() {
      window.open('https://echarts.apache.org/examples/zh/index.html', '_blank');
    }

    return {
      moreExample,
    };
  }
})
</script>

<style>
.logo {
  color: white;
  font-size: 1rem;
}
.content {
  width: 80%;
  margin: 20px auto;
}
.chart {
  width: 100%;
  height: 400px;
  margin: 30px 0;
}
</style>