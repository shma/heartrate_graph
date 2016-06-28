
function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.3667, lng: 136.6367},
    zoom: 17
  });


  $(function () {
    var rateKasoku = [];

    //　グラフ処理などを開始
    var date = "0623";
    $.getJSON("/js/" + date + "/2016_" + date + "_rate.json" , function(data) {
      $.getJSON("/js/" + date + "/2016_" + date + "_sanjiku.json" , function(sanjiku) {
        $.getJSON("/js/" + date + "/2016_" + date + "_place.json" , function(photos) {
          $.getJSON("/photos?date=" + date , function(list) {
          for(key in data){
            data[key][0] = Date.parse(data[key][0]);
            if (key > 0) {
              rateKasoku[key] = [data[key][0], data[key][1] - data[key-1][1]];
            } else {
              rateKasoku[0] = [data[key][0], 0];
            }
          }

console.log(rateKasoku);
          for(key in sanjiku){
            sanjiku[key][0] = Date.parse(sanjiku[key][0]);
            sanjiku[key][1] = sanjiku[key][3];
          }

          var htmlElement = ""

          for(key in photos){
            photos[key][0] = Date.parse(photos[key][0]);
            photos[key][3] = list[key];

            htmlElement += "<li class='uk-width-1-4 photo-list'><img src='/img/" + date + "/" + photos[key][3] + "'></li>"

            var latlng = new google.maps.LatLng(photos[key][1],photos[key][2]);
            var marker = new google.maps.Marker({
                         position: latlng,
                         map: map,
                         title: photos[key][3]
            });
            marker.addListener('click', function() {
                console.log(this.title)
                $.colorbox({href:"/img/"+ date + "/" + this.title, height: "100%"});
            });


          }

          $(".photo-ul").html(htmlElement);


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
            }},{title: {
              text: '位置情報'
            }}],

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
                              $.colorbox({href:"/img/" + date + "/" + photos[this.index][3], height: "100%"});

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
              type: 'line',
              yAxis: 2,
              name: '心拍数の加速度',
              data: rateKasoku
            },{
              type: 'scatter',
              yAxis: 1,
              name: '写真がとられた地点',
              data: photos
            }]
          });
        })
      })
    })
    })
  });
}
