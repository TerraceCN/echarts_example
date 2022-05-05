<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CustomSeriesRenderItemParams, CustomSeriesRenderItemAPI } from 'echarts';
import { use, registerMap } from "echarts/core";
import { CustomChart, } from "echarts/charts";
import {
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import windData from "../assets/winds.json";
import world from "../assets/world.json";


use([
  CustomChart,
  VisualMapComponent,
  GeoComponent,
]);
registerMap('world', world as any);

export default defineComponent({
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    function shuffle(array: any[]) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    let p = 0;
    let maxMag = 0;
    let minMag = Infinity;
    let data = [];

    for (var j = 0; j < windData.ny; j++) {
      for (var i = 0; i < windData.nx; i++, p++) {
        var vx = windData.data[p][0];
        var vy = windData.data[p][1];
        var mag = Math.sqrt(vx * vx + vy * vy);
        // 数据是一个一维数组
        // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
        data.push([
          (i / windData.nx) * 360 - 180,
          (j / windData.ny) * 180 - 90,
          vx,
          vy,
          mag
        ]);
        maxMag = Math.max(mag, maxMag);
        minMag = Math.min(mag, minMag);
      }
    }
    shuffle(data);

    const option = {
      backgroundColor: '#333',
      visualMap: {
        left: 'center',
        min: minMag,
        max: maxMag,
        dimension: 4,
        inRange: {
          // prettier-ignore
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        calculable: true,
        textStyle: {
          color: '#fff'
        },
        orient: 'horizontal'
      },
      geo: {
        map: 'world',
        left: 0,
        right: 0,
        top: 0,
        zoom: 1,
        silent: true,
        roam: true,
        itemStyle: {
          areaColor: '#323c48',
          borderColor: '#111'
        }
      },
      series: {
        type: 'custom',
        coordinateSystem: 'geo',
        data: data,
        encode: {
          x: 0,
          y: 0
        },
        renderItem: function (
            params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI
          ) {
          const x = api.value(0) as number;
          const y = api.value(1) as number;
          const dx = api.value(2) as number;
          const dy = api.value(3) as number;
          const start = api.coord([
            Math.max(x - dx / 5, -180),
            Math.max(y - dy / 5, -90)
          ]);
          const end = api.coord([
            Math.min(x + dx / 5, 180),
            Math.min(y + dy / 5, 90)
          ]);
          return {
            type: 'line',
            shape: {
              x1: start[0],
              y1: start[1],
              x2: end[0],
              y2: end[1]
            },
            style: {
              lineWidth: 0.5,
              stroke: api.visual('color')
            }
          };
        },
        progressive: 2000
      }
    };
    
    return {
      option,
    };
  }
})
</script>
