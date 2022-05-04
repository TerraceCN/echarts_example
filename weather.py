# -*- coding: utf-8 -*-
import json
import httpx
from lxml import etree

urls = [f"http://www.tianqihoubao.com/lishi/yangzhou/month/2021{m:02d}.html" for m in range(1, 13)]

data = []
for url in urls:
    res = httpx.get(url, timeout=10)
    html = etree.HTML(res.text)
    month = html.xpath("//h1")[0].text[-3:-1]
    for i in html.xpath("//table//tr")[1:]:
        date = i.xpath("./td/a")[0].text.strip()
        print(date)
        weather = i.xpath("./td")[1].text.split('/')[0].strip()
        temp = i.xpath("./td")[2].text.strip()
        temp_max = int(temp.split('/')[0].strip()[:-1])
        temp_min = int(temp.split('/')[1].strip()[:-1])
        data.append({
            "date": date,
            "weather": weather,
            "temp_max": temp_max,
            "temp_min": temp_min,
        })

with open("weather.json", "w", encoding="utf-8") as file:
    file.write(json.dumps(data, ensure_ascii=False, indent=2))
