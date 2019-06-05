# MsFloss Plots and Data Resume

> MsFloss plot builder.

## Usage
The javascript file links below must be inserted in one html file
```html

<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/lucianokelvin/graficosPOO@master/api/api.js" type="text/javascript"></script>
```
In the order to plot, it is necessary:

One HTML canvas
```HTML
<canvas id="commitsChart" width="100" height="100"></canvas>
```

Call JavaScript function by “id” canvas 
```js
numberOfCommits("commitsChart");
```
