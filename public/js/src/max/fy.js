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


} (jQuery));


/* END FILE */
var fy = $;

(function ($) {
    /* global window, skrollr, setTimeout, setInterval, console, Modernizr, clearTimeout */

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
                getPos = $('.cbp-so-scroller').position().top;   

            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                bindEvents(); 
                displayTitle();
            }

            function bindEvents() {

                // the element to act on if viewable
                var myelement = $('.cbp-so-section'),
                    elementWidth = myelement.width() / 2;

                $(window).scroll(function(){
                    if(!didScroll) {
                        didScroll = true;
                       
                        scrollPage(); 
                        elemAnimate();
                    }                    
                });

                $('nav a').on('click', function(e) {
                    e.preventDefault();
                    var target = $(this).data('jump');
                    if (target === 'slide-1') {
                        fy.scrollTo($('header'));
                    } else {
                        fy.scrollTo(  $('#'+target+''), $('#'+target+'').offset().top-$('.cbp-af-header').outerHeight() );
                    }                    
                });
            }

            function displayTitle() {

                var titles = ['creative developer', 'front-end designer','ux developer', 'front-end artist', 'code poet'];

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
                    slideElem = $('.cbp-so-section'),
                    elementWidth = slideElem.width() / 2;

                if(!getViewportH(slideElem)) {                       
                    $('.cbp-so-side-right').css({
                        '-webkit-transform': 'translateX('+elementWidth+'px)',
                        '-moz-transform': 'translateX('+elementWidth+'px)',
                        'transform': 'translateX('+elementWidth+'px)'
                    });
                    $('.cbp-so-side-left').css({
                        '-webkit-transform': 'translateX(-'+elementWidth+'px)',
                        '-moz-transform': 'translateX(-'+elementWidth+'px)',
                        'transform': 'translateX(-'+elementWidth+'px)'                         
                    });

                } else {
                    $('.cbp-so-side-left, .cbp-so-side-right').css({
                        '-webkit-transform': 'translateX(0px)',
                        '-moz-transform': 'translateX(0px)',
                        'transform': 'translateX(0px)'
                    });
                }

                if(!getViewportH(imgElem)) { 
                    imgElem.addClass('moveBG');  
                } else {
                    imgElem.removeClass('moveBG');  
                }
            }

            function scrollPage() {
                var sy = scrollY(),
                    headerContainer = $('.cbp-af-header'),
                    getHeight = headerContainer.height(),
                    scrolledPast = false;

                if (sy >= changeHeaderOn) {                    
                    headerContainer.addClass('cbp-af-header-shrink');  
                    navHeight();
                } else {                    
                    headerContainer.removeClass('cbp-af-header-shrink');        
                    navHeight();  
                }

                // if (sy >= getPos && scrolledPast === false ) {       
                //     console.log('yes!!!!');

                //     scrolledPast = true;

                // } else {
                //     console.log('hey no');
                // }

                didScroll = false;  
            }

            function scrollY() {
                return window.pageYOffset || $(document).scrollTop;
            }

            function navHeight() {

                setTimeout(function() {
                    var getHeight = $('.cbp-af-header').height();
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
