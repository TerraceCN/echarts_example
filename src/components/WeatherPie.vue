<template>
  <a-tabs v-model:activeKey="selectedMonth">
    <a-tab-pane key="0" tab="全年" />
    <a-tab-pane key="1" tab="一月" />
    <a-tab-pane key="2" tab="二月" />
    <a-tab-pane key="3" tab="三月" />
    <a-tab-pane key="4" tab="四月" />
    <a-tab-pane key="5" tab="五月" />
    <a-tab-pane key="6" tab="六月" />
    <a-tab-pane key="7" tab="七月" />
    <a-tab-pane key="8" tab="八月" />
    <a-tab-pane key="9" tab="九月" />
    <a-tab-pane key="10" tab="十月" />
    <a-tab-pane key="11" tab="十一月" />
    <a-tab-pane key="12" tab="十二月" />
  </a-tabs>
  <v-chart class="chart" :option="option" :autoresize="true" style="margin-top: 0;" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import { weatherCnt } from "../data";


use([
  PieChart,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
]);

export default defineComponent({
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const selectedMonth = ref('0');
    const data = ref<{ name: string, value: number }[]>([]);

    function loadMonth() {
      const cnt_tmp: {[k: string]: number} = {};
      const month = parseInt(selectedMonth.value);
      
      Object.keys(weatherCnt).forEach(key => {
        if (month === 0) {
          weatherCnt[key].forEach(item => {
            if (item !== 0) {
              cnt_tmp[key] = (cnt_tmp[key] || 0) + item;
            }
          });
        } else {
          if (weatherCnt[key][month - 1] !== 0) {
            cnt_tmp[key] = weatherCnt[key][month - 1];
          }
        }
      });

      data.value = [];
      Object.keys(cnt_tmp).forEach(key => {
        data.value.push({
          name: key,
          value: cnt_tmp[key],
        });
      });
    }
    loadMonth();
    watch(() => selectedMonth.value, loadMonth);
    
    const option = reactive({
      tooltip: {
        trigger: 'item',
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        top: 'bottom'
      },
      series: [
        {
          name: '天气',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
      ]
    });

    return {
      option,
      selectedMonth
    };
  }
})
</script>
