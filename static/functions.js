google.charts.load('current', {'packages':['corechart']});

//grab the hardware cpu data
function drawCPU(callback) {
    var json = null;
    $.ajax({
        'async': true,
        'global': false,
        'url': '/cpu',
        'dataType': "json",
        'success': function (data) {
            console.log(data)
            var percentage = (data['used']/(data['free'] + data['used']))*100
            var cpu_bar = document.getElementById("cpu_bar");
            var width = 1;

            var id = setInterval(function(){
                 if (width >= percentage){
                       clearInterval(id);
                 } else if (width >= 79){
                       cpu_bar.style.color = '#F18F01';
                 } else {
                       width++;
                       cpu_bar.style.width = width + '%';
                       $("#cpu_bar").text(width + '%');
                 }
            })
        }
    });
}

//grab the RAM data
function drawRAM(callback){
    var json = null;
    $.ajax({
        'async': true,
        'global': false,
        'url': '/ram',
        'dataType': "json",
        'success': function (data) {
            console.log(data)
            var percentage = (data['used']/(data['free'] + data['used']))*100
            var ram_bar = document.getElementById("ram_bar");
            var width = 1;

            var id = setInterval(function(){
                if (width >= percentage){
                } else if (width >= 79){
                   ram_bar.style.backgroundColor = "#F18F01";
                }
                else {
                   width++;
                   ram_bar.style.width = width + '%';
                   $("#ram_bar").text(width + '%');
                }
            });
        }
    });
}
//grab the HDD data
function drawHDD(callback){
    var json = null;
    $.ajax({
        'async': true,
        'global': false,
        'url': '/hdd',
        'dataType': "json",
        'success': function (data) {
            console.log(data)

            var hdd_data = new google.visualization.DataTable();
            hdd_data.addColumn('string', 'Usage');
            hdd_data.addColumn('number', 'Percentage');
            hdd_data.addRows([
                ['used', (data['used']/1024)/1024],
                ['free', (data['free']/1024)/1024]
            ])

            var options = {
                          'colors':['#F18F01', '#048BA8'],
                          'legend': {'position':'none'},
                          'backgroundColor': { 'fill' : 'transparent' },
                          chartArea:{'width':'100%','height':'100%', left:'0%', top:'0%'},
                          pieSliceBorderColor : "#2F2D2E",
                          'title':'HDD Space'
                          };
            var hdd_chart = new google.visualization.PieChart(document.getElementById('hdd'));
           function resizeChart () {
                   hdd_chart.draw(hdd_data, options);
           }
           if (document.addEventListener) {
                   window.addEventListener('resize', resizeChart);
           }
           else if (document.attachEvent) {
                   window.attachEvent('onresize', resizeChart);
           }
           else {
                   window.resize = resizeChart;
           }
           hdd_chart.draw(hdd_data,options);
        }
    });
}
/*
//grab the player data
function player_list(callback){
    var json = null;
    $.ajax({
        'async': true,
        'global': false,
        'url': '/players',
        'dataType': "json",
        'success': function (data) {
            console.log(data)
            if (data['players'].length >= 1){
              data.foreach(function(item, index){
                   $("#player_data").append("<span class='player'>" + item['name'] + "</span>");
              })
            }
            else {
              $("#player_data").text("None");
            }
        }
    });
}
*/
//grab the ServerStatus
function serverStatus(callback){
    var json = null;
    $.ajax({
        'async': true,
        'global': false,
        'url': '/status',
        'dataType': "json",
        'success': function (data) {
            console.log(data)
            if (data['status'] === 'Offline'){
                $("#status").css('color','#F18F01');
            }
            $("#status").text(data['status']);
            $("#player_data").text(data['players_online']);
        }
    });
}

