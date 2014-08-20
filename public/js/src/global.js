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


