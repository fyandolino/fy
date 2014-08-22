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

                    $('.more-me').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                        counter();
                    });       

                if(!getViewportH(imgElem)) { 
                    imgElem.addClass('moveBG');  
                } else {
                    imgElem.removeClass('moveBG');  
                }
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

             function counter() {
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

             }
        
            init();
    };

    $.chartDisplay = function (bigData) { 

        function init(){
        }

        init();
    };

} (jQuery));

$(function() {
    new fy.main();
});
