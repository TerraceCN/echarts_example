import data from "./assets/weather_data.json";

export let days: string[] = [];
export let tempMax: number[] = [];
export let tempMin: number[] = [];

export let monthDay: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export let tempAvgMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export let weatherCnt: {[k: string]: number[]} = {};

interface WeatherItem {
  date: string;
  weather: string;
  temp_max: number;
  temp_min: number;
}

data.forEach((item: WeatherItem) => {
  days.push(item.date);
  tempMax.push(item.temp_max);
  tempMin.push(item.temp_min);
  const month = parseInt(item.date.substring(5, 7)) - 1;
  if (item.weather in weatherCnt) {
    weatherCnt[item.weather][month] += 1;
  } else {
    weatherCnt[item.weather] = monthDay.map((_, i) => i === month ? 1 : 0);
  }
  tempAvgMonth[month] += item.temp_max;
  monthDay[month] += 1;
});
for (let i = 0; i < 12; i++) {
  tempAvgMonth[i] = Math.round(tempAvgMonth[i] / monthDay[i] * 100) / 100;
}