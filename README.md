# MsFloss Plots and Data Resumè

> MsFloss plot builder.

## Usage
The javascript file links below must be inserted in your html file
```html

<script src="node_modules/chart.js/dist/Chart.min.js"></script>
<script src="api.js" type="text/javascript"></script>
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
