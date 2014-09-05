var fy = $;

(function ($) {
    /* global window, setTimeout, setInterval, console, Modernizr, clearTimeout */

    /**
    Boilerplate Object reference for Samsung project.

    @class $.BoilerPlateObject
    @constructor
    @param {Object} params External object settings passed into the object.
    **/

    var myLatlng = new google.maps.LatLng(20,0),
        mapOptions = {
          center: myLatlng,
          zoom: 2/*,
          disableDefaultUI: true*/
        },
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions),
        image = 'img/icon/hpin.png',
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,                    
            icon: image
        });

        var line;

    var locData  = [
            {
            'location':'New York',
            'lat': 40.712784, 
            'long': -74.005941,
            }, 
            {
            'location':'Italy',
            'lat': 41.871940, 
            'long': 12.567380,
            },
            {
            'location':'Spain',
            'lat': 40.463667, 
            'long': -3.749220,
            },
            {
            'location':'Brazil',
            'lat': -14.235004, 
            'long': -51.925280,
            },
            {
            'location':'Germany',
            'lat': 51.165691, 
            'long': 10.451526,
            },
            {
            'location':'Amsterdamn',
            'lat': 52.370216, 
            'long': 4.895168,
            },
            {
            'location':'Greece',
            'lat': 39.074208, 
            'long': 21.824312,
            },
            {
            'location':'France',
            'lat': 46.227638, 
            'long': 2.213749,
            },
            {
            'location':'Ireland',
            'lat': 53.412910, 
            'long': -8.243890,
            },
            {
            'location':'Mexico',
            'lat': 23.634501, 
            'long': -102.552784,
            },
            {
            'location':'Thailand',
            'lat': 15.870032, 
            'long': 100.992541,
            },
            {            
            'location':'Singapore',
            'lat': 1.352083, 
            'long': 103.819836,
            }
        ];

      /*{'Italy', 41.871940, 12.567380},
      {'Spain', 40.463667, -3.749220},
      {'Brazil', -14.235004, -51.925280},
      {'Germany', 51.165691, 10.451526},
      {'Amsterdamn', 52.370216, 4.895168},
      {'Greece', 39.074208, 21.824312},
      {'France', 46.227638, 2.213749},
      {'Ireland', 53.412910, -8.243890},
      {'Mexico', 23.634501, -102.552784},
      {'Thailand', 15.870032, 100.992541},
      {'Singapore', 1.352083, 103.819836}*/
    


    $.canvasDisplay = function () { 

        function init(){
            console.log(locData);
            gmaps();                       
        }

        function gmaps() {

                setMarkers();

        }

        function setMarkers(){
            for (var i = 0; i < locData.length; i++) {
            var myLatLng = new google.maps.LatLng(locData[i].lat, locData[i].long);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: '/img/map/pin.png'
            });

            var flightPlanCoordinates = [
                new google.maps.LatLng(locData[0].lat, locData[0].long),
                /*new google.maps.LatLng(21.291982, -157.821856),
                new google.maps.LatLng(-18.142599, 178.431),*/
                new google.maps.LatLng(locData[i].lat, locData[i].long)
            ];        

            var lineSymbol = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 2
            };

            var symbolOne = {
                path: 'M250.2,59.002c11.001,0,20.176,9.165,20.176,20.777v122.24l171.12,95.954v42.779l-171.12-49.501v89.227l40.337,29.946v35.446l-60.52-20.18-60.502,20.166v-35.45l40.341-29.946v-89.227l-171.14,49.51v-42.779l171.14-95.954v-122.24c0-11.612,9.15-20.777,20.16-20.777z ',
                scale: 0.0333, 
                strokeOpacity: 1,
                color: 'black',
                strokeWeight: 1,
                fillColor: 'black',
                fillOpacity: 1,
                anchor: new google.maps.Point(250,0)
              };

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                /*strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2*/
                strokeOpacity: 0,
                 icons: [
                 {
                  icon: lineSymbol,
                  offset: '0',
                  repeat: '10px'
                },
                {
                  icon: symbolOne,
                  offset: '0'
                }
                ]
            });

            flightPath.setMap(map);

            animateCircle(flightPath);
            }            
        }

        // Use the DOM setInterval() function to change the offset of the symbol
        // at fixed intervals.
        function animateCircle(flightPath) {
            var count = 0;
            window.setInterval(function() {
              count = (count + 1) % 200;

              var icons = flightPath.get('icons');

              console.log(icons);

              icons[1].offset = (count / 2) + '%';
              flightPath.set('icons', icons);
          }, 150);
        }


        init();
    };

} (jQuery));

$(function() {
    new fy.canvasDisplay();
});
