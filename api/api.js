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
window.colors.push(window.chartColors.green);
window.colors.push(window.chartColors.blue);
window.colors.push(window.chartColors.purple);
window.colors.push(window.chartColors.lightBlue);


var url = 'http://msfloss.herokuapp.com';

// Get the JSON
async function getCall(){
    endpoint = arguments[0];
    var response = 0;
    if (arguments.length == 1) {
        response = await fetch(endpoint);
    } else if (arguments.length == 2) {
        response = await fetch(endpoint+"?repo="+arguments[1]);
    } else if (arguments.length == 3) {
        response = await fetch(endpoint+"?order="+arguments[1]+"&limit="+arguments[2]);        
    } else {
        response = await fetch(endpoint+"?order="+arguments[1]+"&limit="+arguments[2]+"&repo="+arguments[3]);
    }
    const body = await response.json();
    return body;
}

// GIT
async function numberOfCommits(elementId, order="decrescent", limit=10, repo=1){
    var endpoint = url + '/git/commits/'
    const data = await getCall(endpoint, order, limit, repo)
    graphBar(endpoint, elementId, "Number of Commits", data)
}

async function numberOfCommitsReviews(elementId, repo=1){
    var endpoint = url + '/git/commits_reviews/'
    const data = await getCall(endpoint, repo)
    graphBarStack(endpoint, elementId, "Commits And Reviews", data)
}

async function contributionDaysGit(elementId, order="decrescent", limit=10, repo=1){
    var endpoint = url + '/git/contribution_period'
    const data = await getCall(endpoint, order, limit, repo)
    graphHorizontalBar(endpoint, elementId, "Contribution Period (Git activity in days)", data)
}

// IRC
async function irc_users(elementId, repo="linux-kernel"){
    var endpoint = url + '/irc/users_participation/'
    const data = await getCall(endpoint, repo)
    lineBar(endpoint, elementId, "IRC users", data)
}

async function numberOfIRCMsgs(elementId, repo="linux-kernel"){
    var endpoint = url + '/irc/number_messages/'
    const data = await getCall(endpoint, repo)
    lineBar(endpoint, elementId, "IRC Messages along the Day", data)
}

// Email
async function importance_discussions(elementId, repo=""){
    var endpoint = url + '/email/importance_discussions/'
    const data = await getCall(endpoint, repo)
    manyLineBar(endpoint, elementId, "Importance of Messages", data)
}

async function developerBehavior(elementId, repo=""){
    var endpoint = url + '/email/developer_behavior/'
    const data = await getCall(endpoint, repo)
    graphBarZeroHundread(endpoint, elementId, "Aggressiveness Level of User (%)", data)
}

async function messagesXcountUsers(elementId, repo=""){
    var endpoint = url + '/email/messages_x_counts_users/'
    const data = await getCall(endpoint, repo)
    graphBarManyColumns(endpoint, elementId, "Number of users x Number of messages", data)
}

async function numberOfParticipantsSubject(elementId, order="decrescent", limit=10, repo=""){
    var endpoint = url + '/email/num_participants'
    const data = await getCall(endpoint, order, limit, repo)
 	graphBar(endpoint, elementId, "Number of Participants by Subject", data)
}

async function emailMessageSizes(elementId, order="decrescent", limit=10, repo=""){
    var endpoint = url + '/email/message_size'
    const data = await getCall(endpoint, order, limit, repo)
 	graphBar(endpoint, elementId, "Emails size (Number of Characteres)", data)
}

async function lifetimeConversation(elementId, order="decrescent", limit=10, repo=""){
    var endpoint = url + '/email/lifetime_conversation'
    const data = await getCall(endpoint, order, limit, repo)
    graphHorizontalBar(endpoint, elementId, "Lifetime conversation (in days)", data)
}

async function subjectSentimentAnalysis(elementId, order="decrescent", limit=10, repo=""){
    var endpoint = url + '/email/subjects_NLP_analysis/'
    const data = await getCall(endpoint, order, limit, repo)
    graphBarZeroHundread(endpoint, elementId, "Aggressiveness Level of Subject (%)", data)
}

// Issue
async function numberOfCLosedIssues(elementId, order="decrescent", limit=10, repo=""){
    var endpoint = url + '/issuetracker/issues_closed'
    const data = await getCall(endpoint, order, limit, repo)
 	graphBar(endpoint, elementId, "Number of Closed Issues by Contributor", data)
}

// -------------------------------------------------------------------------

// Plot a horizontal bar chart
async function graphHorizontalBar(endpoint, element, label, data){
    var ctx = document.getElementById(element);
    
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: Object.keys(data).map(function(i) {
                    if(i.length > 20) return i.slice(0, 20)+"..."
                    else return i.slice(0, 20)}),
            datasets: [{
            backgroundColor: window.colors[Math.floor(Math.random() * window.colors.length)],
            label: label,
            data: Object.values(data),
            borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Plot a graph of bar
async function graphBar(endpoint, element, label, data){
	var ctx = document.getElementById(element);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data).map(function(i) {
                if(i.length > 20) return i.slice(0, 20)+"..."
                else return i.slice(0, 20)}),
            datasets: [{
            backgroundColor: window.colors[Math.floor(Math.random() * window.colors.length)],
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

async function graphBarManyColumns(endpoint, element, label, data){
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
            labels: Object.keys(data).map(function(i) {
                if(i.length > 20) return i.slice(0, 20)+"..."
                else return i.slice(0, 20)}),
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


async function graphBarZeroHundread(endpoint, element, label, data){
    var ctx = document.getElementById(element);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data).map(function(i) {
                if(i.length > 20) return i.slice(0, 20)+"..."
                else return i.slice(0, 20)}),
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
async function graphBarStack(endpoint, element, label, data){
    var ctx = document.getElementById(element);

    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data[0].map(function(i) {
            if(i.length > 20) return i.slice(0, 20)+"..."
            else return i.slice(0, 20)}),
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
async function lineBar(endpoint, element, label, data){
    var ctx = document.getElementById(element);

    var myLineChart = new Chart(ctx, {
    type: 'line',
            data: {
                labels: Object.keys(data).map(function(i) {
                    if(i.length > 20) return i.slice(0, 20)+"..."
                    else return i.slice(0, 20)}),
                datasets: [{
                    label: label,
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: Object.values(data),
                    fill: false,
                }]}});
}

async function manyLineBar(endpoint, element, label, data){
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
                labels: Object.keys(data[keys[0]]).map(function(i) {
                    if(i.length > 20) return i.slice(0, 20)+"..."
                    else return i.slice(0, 20)}),
                datasets: datasets,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
            }});
}
