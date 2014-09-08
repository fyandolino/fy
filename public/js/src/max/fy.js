var fy = $;

(function ($) {
    /* global window, setTimeout, console, Modernizr, clearTimeout */

    /**
    @class 
    @constructor
    @param {Object} 
    **/
    fy.Detect = function () {
        console.log('global');        
    };

    /**
	Scrolls to an element.
	@class $.scrollTo
	@constructor
	
	@param {HTMLElement} element - the element you want the body to scroll to.
	@param {Number} position (optional) - the top coordinate where to scroll to.
	@param {Number} speed (optional) - speed of scroll.
	@param {Function} func (optional) - callback function to be called after scroll
	**/
	fy.scrollTo = function(element, position, speed, func) {
		var pos = position || $(element).offset().top,
			_speed = speed || 800,
			callback = (func) ? func() : null;

		$('html, body').animate({scrollTop: pos}, _speed, function () {
			callback;
		});
	};

	/**
	Dectects if an elem is in view.
	@class $.elemInview
	@constructor
	
	@param {HTMLElement} element - the element you want the body to scroll to.
	**/
	fy.elemInview = function(elem) {

		var detect = {      		
      		inview: false,
	        top: false,
	        bottom: false,
	        whole: false,
	        out: false
		};

        $(elem).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
          if (isInView) {
            //console.log('element is now visible in the viewport');
            // flag 
            detect.inview = true;
            detect.out = false;

            if (visiblePartY === 'top') {
                //console.log('top part of element is visible');
                detect.top = true;
                detect.out = false;
            } else if (visiblePartY === 'bottom') {
              //console.log('bottom part of element is visible');
              detect.bottom = true;
              detect.out = false;
            } else {
              //console.log('whole part of element is visible');
              detect.whole = true;
              detect.out = false;
            }
          } else {
            //console.log('element has gone out of viewport');                    
            detect.out = true;
            detect.inview = false;
            detect.top = false;
            detect.bottom = false;                    
            detect.whole = false;
          }
        });

		fy.viewDetect = detect;

		return detect;
    };


} (jQuery));


/* END FILE */
var fy = $;

(function ($) {
    /* global window, setTimeout, setInterval, console, Modernizr, clearTimeout */

    /**
    Boilerplate Object reference for Samsung project.

    @class $.BoilerPlateObject
    @constructor
    @param {Object} params External object settings passed into the object.
    **/
    $.main = function (params) {              
       
            /**
            Global This
            **/
            var didScroll = false,
                changeHeaderOn = 300,
                getPos = $('.ct-slide').position().top;

            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                bindEvents(); 
                displayTitle();
                elemAnimate();
                activeNav();

                new fy.gmapsTravel();
            }

            function bindEvents() {

                // the element to act on if viewable
                var myelement = $('.slide-out-cc'),
                    elementWidth = myelement.width() / 2;

                $(window).scroll(function(){
                    if(!didScroll) {
                        didScroll = true;                       
                        scrollPage();  
                        activeNav();

                       /* if (fy.viewDetect.top) {
                            //console.log('hey this is working');
                        }   */                     
                    }                    
                });

                $('nav a').on('click', function(e) {
                    e.preventDefault();
                    var target = $(this).data('jump');
                    if (target === 'intro') {
                        fy.scrollTo($('header'));
                    } else {
                        fy.scrollTo(  $('.'+target+''), $('.'+target+'').offset().top-$('.header-cc').outerHeight() + 20 +'px' );
                    }                    
                });
            }

            function displayTitle() {

                var titles = ['creative developer', 'front-end designer','UX developer', 'front-end artist', 'code poet'];

                $('.title').html(titles[0]);
                var i = 1;
                setInterval(function(){
                    $('.title').hide().html(titles[i]).fadeIn();                    
                    i++;
                    if(i >= titles.length) { i = 0; }
                },4000);
            }


            function elemAnimate() {

                // the element to act on if viewable
                var imgElem = $('.hdr-cc'),
                    slideElem = $('.slide-out-cc'),
                    elementWidth = slideElem.width() / 2;

                   //fy.elemInview($('.work'));

                   slideElem.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                      if (isInView) {
                        //console.log('element is now visible in the viewport');
                        $('.slide-side-left, .slide-side-right').css({
                            '-webkit-transform': 'translateX(0px)',
                            '-moz-transform': 'translateX(0px)',
                            'transform': 'translateX(0px)'
                        });     

                      } else {
                        //console.log('element has gone out of viewport');      
                                   
                         $('.slide-side-right').css({
                            '-webkit-transform': 'translateX('+elementWidth+'px)',
                            '-moz-transform': 'translateX('+elementWidth+'px)',
                            'transform': 'translateX('+elementWidth+'px)'
                        });
                        $('.slide-side-left').css({
                            '-webkit-transform': 'translateX(-'+elementWidth+'px)',
                            '-moz-transform': 'translateX(-'+elementWidth+'px)',
                            'transform': 'translateX(-'+elementWidth+'px)'                         
                        });
                      }
                    });   

                    $('.where').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                        $('.cb-slideshow li span').css(
                            '-webkit-animation-play-state','running'
                        );
                    });       

                    // $('.more-me').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                    //     counter();
                    // });     
                    
                    $('.about-info').on('click', function(e){
                        e.preventDefault();
                        var arrowPos = $(this).data('info'),
                            slideWidth = $(this).data('content'),
                            dataType = $(this).data('type'),
                            mapHeight = $('#map-canvas').height(),
                            slideHeight = $('.slide-1').height();

                        $('.arrow-up').css({
                            'left':arrowPos
                        });

                        $('.slide-content').css({
                            'right':slideWidth
                        });

                        if (dataType === 'travel') {
                            $('.slide-cc').height(mapHeight);
                        } else {
                            $('.slide-cc').height(slideHeight);
                        }

                    });



                /*if(!getViewportH(imgElem)) { 
                    imgElem.addClass('moveBG');  
                } else {
                    imgElem.removeClass('moveBG');  
                }*/
            }

            function activeNav() {

                var topRange = 90,
                    contentTop = [];


                // Set up content an array of locations
                $('.section-cc').each(function(){
                    contentTop.push( $(this).offset().top );
                });

                //console.log(contentTop);

                var winTop = $(window).scrollTop(),
                    bodyHt = $(document).height(),
                    vpHt = $(window).height();  // viewport height + margin

                $.each( contentTop, function(i,loc){
                   if ( ( loc > winTop && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){

                    console.log('loc',loc);

                    console.log('winTop',winTop);

                    console.log('winTop + topRange',winTop + topRange);

                    $('nav a').removeClass('active').eq(i).addClass('active');
                   }
                });
            }

            function scrollPage() {
                var sy = scrollY(),
                    headerContainer = $('.header-cc'),
                    getHeight = headerContainer.height(),
                    scrolledPast = false;

                if (sy >= changeHeaderOn) {                    
                    headerContainer.addClass('header-cc-shrink');  
                    navHeight();
                } else {                    
                    headerContainer.removeClass('header-cc-shrink');        
                    navHeight();  
                }
                didScroll = false;  
            }

            function scrollY() {
                return window.pageYOffset || $(document).scrollTop;
            }

            function navHeight() {

                setTimeout(function() {
                    var getHeight = $('.header-cc').height();
                    $('header').height(getHeight);
                 }, 300);                
            }

            /* Scroll Events */

            function getViewportH(elem) {

                var docViewTop = $(window).scrollTop(),
                    docViewBottom = docViewTop + $(window).height(),
                    elemTop = $(elem).offset().top,
                    elemBottom = elemTop + $(elem).height();

                //return ((elemBottom >= docViewTop - ($(elem).height() * 0.9)  ) && (elemTop <= docViewBottom - ($(elem).height() * 0.9)  ));

                return ( elemTop <= docViewBottom - ($(elem).height() * 0.9)) && (elemTop > docViewTop - ($(elem).height() * 0.9) );
            
             }

             /*function counter() {
                var moreMe = $('.more-me'),
                    from = $('.counter').data('from'),
                    to = $('.counter').data('to');

                var i = from;
                setInterval(function(){
                    i++;
                    if(i <= to) {                         
                        $('.counter').hide().html(i).fadeIn();     
                    }
                },450);

             }*/
        
            init();
    };

    $.gmapsTravel = function () { 

        var myLatlng = new google.maps.LatLng(20,0),
            mapOptions = {
              center: myLatlng,
              zoom: 2,
              scrollwheel: false,
              navigationControl: false,
              mapTypeControl: false,
              scaleControl: false,
              draggable: false,
              disableDefaultUI: true
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
    
              icons[1].offset = (count / 2) + '%';
              flightPath.set('icons', icons);
          }, 150);
        }

        init();
    };

} (jQuery));

$(function() {
    new fy.main();
});
