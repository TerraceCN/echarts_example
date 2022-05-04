<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import { days, tempMax, tempMin } from "../data";


use([
  LineChart,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

export default defineComponent({
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const option = {
      legend: {
        data: ['最高气温', '最低气温']
      },
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
        boundaryGap: false,
        data: days
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          snap: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 8
        },
        {
          start: 0,
          end: 8
        }
      ],
      series: [
        {
          name: '最高气温',
          type: 'line',
          smooth: true,
          smoothMonotone: 'x',
          sampling: 'lttb',
          data: tempMax
        },
        {
          name: '最低气温',
          type: 'line',
          smooth: true,
          smoothMonotone: 'x',
          sampling: 'lttb',
          data: tempMin
        }
      ]
    };

    return {
      option,
    };
  }
})
</script>
