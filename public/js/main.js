$(function () {
    var date = [];
    var rate = [];

    $.getJSON("/js/heart.json" , function(data) {
      for(key in data){
        date.push(data[key].date);
        rate.push(data[key].rate);
      }

          console.log(date)

      $('#container').highcharts({
        chart: {
                zoomType: 'x'
            },
        title: {
            text: 'Matsuno Heart Rate',
            x: -20 //center
        },
/**
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
**/
        xAxis: {
            categories: date
        },
        yAxis: {
            title: {
                text: 'Heart Rate (bpm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        tooltip: {
            valueSuffix: 'bpm'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
          },
        series: [{
            type: 'area',
            name: 'Matsuno',
            data: rate
        }]
      });
    })
});
