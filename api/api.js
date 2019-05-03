var url = 'https://msfloss.herokuapp.com';

async function numberOfCommits(elementId){
	var endpoint = url + '/git/commits/'
 	graphBar(endpoint, elementId, "Number of Commits")
}

async function numberOfCommitsReviews(elementId){
	var endpoint = url + '/git/commits_reviews/'
 	graphBarStack(endpoint, elementId, "Commits And Reviews")
}

async function irc_users(elementId){
 	var endpoint = url + '/irc/users_participation/'
 	lineBar(endpoint, elementId, "Usuarios no IRC")
}


//Get the JSON
async function getCall(endpoint){
  const response = await fetch(endpoint);
  const body = await response.json();
  return body;
}

// Plot a graph of bar
async function graphBar(endpoint, element, label){
	const data = await getCall(endpoint)
	var ctx = document.getElementById(element);

	var myChart = new Chart(ctx, {
    	type: 'bar',
    	data: {
        	labels: Object.keys(data[0]),
        	datasets: [{
            backgroundColor: window.chartColors.blue,
            label: label,
            data: Object.values(data[0]),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
            }
        }
    });
}

// Plot a line of bar with stack
async function graphBarStack(endpoint, element, label){
	const data = await getCall(endpoint)
	var ctx = document.getElementById(element);

	var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data[0],
        datasets: [{
            label: 'number of commits',
            stack : 'Stack 0',
            backgroundColor: window.chartColors.blue,
            data: data[1],
            borderWidth: 2
        }, {
            label: 'number of reviews',
            backgroundColor: window.chartColors.orange,
            stack : 'Stack 0',
            data: data[2],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
    }
});
}

// Plot a graph of line
async function lineBar(endpoint, element, label){
    const data = await getCall(endpoint)
    var ctx = document.getElementById(element);

    var myLineChart = new Chart(ctx, {
    type: 'line',
            data: {
                labels: Object.keys(data[0]),
                datasets: [{
                    label: label,
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: Object.values(data[0]),
                    fill: false,
                }]}});
}
