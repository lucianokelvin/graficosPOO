/*!
 * MsFLOSS JS Library
 * (c) 2019 MsFLOSS Data Visualization Contributors
 */

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    lightBlue : 'rgb(204, 204, 255)'

 }

window.colors = [];
window.colors.push(window.chartColors.red);
window.colors.push(window.chartColors.orange);
window.colors.push(window.chartColors.yellow);


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
 	lineBar(endpoint, elementId, "IRC users")
}

async function importance_discussions(elementId){
    var endpoint = url + '/email/importance_discussions/'
    manyLineBar(endpoint, elementId, "Importance of Messages")
}

async function developerBehavior(elementId){
    var endpoint = url + '/email/developer_behavior/'
    graphBarZeroHundread(endpoint, elementId, "Aggressiveness Level (%)")
}

async function messagesXcountUsers(elementId){
    var endpoint = url + '/email/messages_x_counts_users/'
    graphBarManyColumns(endpoint, elementId, "Number of users x Number of messages")
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
        	labels: Object.keys(data),
        	datasets: [{
            backgroundColor: window.chartColors.blue,
            label: label,
            data: Object.values(data),
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

async function graphBarManyColumns(endpoint, element, label){
    const data = await getCall(endpoint);
    var ctx = document.getElementById(element);

    const data1 = [];
    const data2 = [];
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        data1.push(data[keys[i]][0]);
        data2.push(data[keys[i]][1]);
    }

    var datas = [[]];
    datas.push(data1);
    datas.push(data2);

    var labels = ["","Number of Users", "Number of Messages"]

    var datasets = []
    for (var i = 1; i < datas.length; i++) {
        datasets.push({
            label: labels[i],
            backgroundColor: window.colors[i],
            borderColor: window.colors[i],
            data: datas[i],
        });
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: datasets
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


async function graphBarZeroHundread(endpoint, element, label){
    const data = await getCall(endpoint)
    var ctx = document.getElementById(element);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
            backgroundColor: window.chartColors.lightBlue,
            label: label,
            data: Object.values(data),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                gridLines: {
                           lineWidth:10,

                           drawBorder: false,
                            color: ['red', 'red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'yellow', 'green', 'green']
                        },
                ticks: {
                    min: 0,
                            max: 100,
                            stepSize: 10
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
            label: 'Number of Commits',
            stack : 'Stack 0',
            backgroundColor: window.chartColors.blue,
            data: data[1],
            borderWidth: 2
        }, {
            label: 'Number of Reviews',
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
                labels: Object.keys(data),
                datasets: [{
                    label: label,
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: Object.values(data),
                    fill: false,
                }]}});
}

async function manyLineBar(endpoint, element, label){
    const data = await getCall(endpoint)
    var keys = Object.keys(data);
    var datasets = []
    for (var i = 0; i < keys.length; i++) {
        datasets.push({
            label: keys[i],
            backgroundColor: window.colors[i],
            borderColor: window.colors[i],
            data: Object.values(data[keys[i]]),
            fill: false,
            lineTension : 0.0
        });
    }

    var ctx = document.getElementById(element);
    var myLineChart = new Chart(ctx, {
            type: 'line',
            options: {
                title: {
                    display: true,
                    text: label
                }},
            data: {
                labels: Object.keys(data[keys[0]]),
                datasets: datasets,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
            }});
}
