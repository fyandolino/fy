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
    /* global window, skrollr, setTimeout, console, Modernizr, clearTimeout */

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
                changeHeaderOn = 300;    

            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                // Init Skrollr
                var s = skrollr.init({
                            forceHeight: false
                        });
                 
                // Refresh Skrollr after resizing our sections
                s.refresh($('.homeSlide'));

                bindEvents(); 

                getViewportH();

            }

            function bindEvents() {
                var myelement = $('.pricebox'); // the element to act on if viewable

                $(window).scroll(function(){
                    if(!didScroll) {
                        didScroll = true;
                        
                        //setTimeout(function() {
                            scrollPage(); 
                            getViewportH();  
                            //scrollTop();                                                    
                        //}, 250);
                    }

                    if(getViewportH(myelement)) {
                        $('#prodbar').show();
                    } else {
                        $('#prodbar').hide();// do something when element is not viewable
                    }



                });

                $('nav a').on('click', function(e) {
                    e.preventDefault();
                    var target = $(this).data('jump');
                    if (target === 'slide-1') {
                        fy.scrollTo($('header'));
                    } else {
                        fy.scrollTo($('#'+target+''));
                    }                    
                });

            }

            function scrollPage() {
                var sy = scrollY(),
                    headerContainer = $('.cbp-af-header'),
                    getHeight = headerContainer.height();

                if (sy >= changeHeaderOn) {                    
                    headerContainer.addClass('cbp-af-header-shrink');  
                    navHeight();
                } else {                    
                    headerContainer.removeClass('cbp-af-header-shrink' );        
                    navHeight();     
                }
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

                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();

                var elemTop = $(elem).offset().top;
                var elemBottom = elemTop + $(elem).height();

                return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
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
