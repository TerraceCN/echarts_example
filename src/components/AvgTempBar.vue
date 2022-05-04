<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  MarkPointComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import { tempAvgMonth } from "../data";


use([
  BarChart,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  MarkPointComponent,
]);

export default defineComponent({
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '月平均气温',
          type: 'bar',
          data: tempAvgMonth,
          markPoint: {
            data: [
              { type: 'max', name: '最高' },
              { type: 'min', name: '最低' }
            ]
          },
        },
      ]
    };

    return {
      option,
    };
  }
})
</script>
