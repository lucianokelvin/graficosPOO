# Gráficos MsFLoss

> Gerador de gráficos para o sistema MsFloss

## Usage
Adicione o link para os seguintas arquivos .js
```html

<script src="node_modules/chart.js/dist/Chart.min.js"></script>
<script src="api.js" type="text/javascript"></script>
```

Para chamar os gráficos, crie um canvas no seu HTML
```HTML
<canvas id="commitsChart" width="100" height="100"></canvas>
```

Em seguida chame a função JS com o id do canvas
```js
numberOfCommits("commitsChart");
```


