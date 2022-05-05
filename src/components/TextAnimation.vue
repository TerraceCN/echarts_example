<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use } from "echarts/core";
import {
  GraphicComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";


use([
  GraphicComponent,
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
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: 'Apache ECharts',
              fontSize: 80,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1
            },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0]
                  }
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent'
                  }
                },
                {
                  percent: 1,
                  style: {
                    fill: 'black'
                  }
                }
              ]
            }
          }
        ]
      }
    };

    return {
      option,
    };
  }
})
</script>
