
function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.3667, lng: 136.6367},
    zoom: 15
  });

$(function () {

    var date = [];
    var rate = [];

    $.getJSON("/js/heart_0622_2.json" , function(data) {
      $.getJSON("/js/sanjiku_0622.json" , function(sanjiku) {
        $.getJSON("/js/jpeglist.json" , function(photos) {
        for(key in data){
          data[key][0] = Date.parse(data[key][0]);
        }

        for(key in sanjiku){
          sanjiku[key][0] = Date.parse(sanjiku[key][0]);
          sanjiku[key][1] = sanjiku[key][1];
        }

        console.log(photos);


        for(key in photos){
          photos[key][0] = Date.parse(photos[key][0]);
          photos[key][1] = photos[key][2]
          /**
          var latlng = new google.maps.LatLng(photos[key][1],photos[key][2]);
          var marker = new google.maps.Marker({
                       position: latlng,
                       map: map,
                       title: '表参道駅'
          });
          **/
        }


        $('#graph').highcharts({
          chart: {
                zoomType: 'x',
                alignTicks: false,
          },
          title: {
            text: 'Heart Rate Monitor',
            x: -20 //center
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: [{
            title: {
                text: 'Heart Rate (bpm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
          },{title: {
            text: 'Sanjiku'
          },}],

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

                scatter: {
                  cursor: 'pointer',
                  point: {
                    events: {
                        click: function () {
                            console.log(photos[this.index][3]);

                        }
                    }
                  }
                },
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
            name: '心拍数',
            data: data
          },{
            type: 'line',
            yAxis: 1,
            name: '三軸の値',
            data: sanjiku
          },{
            type: 'scatter',
            yAxis: 1,
            name: '写真',
            data: photos
          }]
        });
      })
    })
    })
});
}
