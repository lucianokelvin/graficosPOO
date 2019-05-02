# Gráficos MsFLOSS

> Gerador de gráficos para o sistema MsFLOSS

## Usage
Adicione o link para os seguintas arquivos javascript
```html

<script src="node_modules/chart.js/dist/Chart.min.js"></script>
<script src="api.js" type="text/javascript"></script>
```

Para plotar os gráficos crie um canvas no seu HTML
```HTML
<canvas id="commitsChart" width="100" height="100"></canvas>
```

Em seguida chame a função JS com o id do canvas
```js
numberOfCommits("commitsChart");
```


