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


