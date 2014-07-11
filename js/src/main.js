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
            var docElem = $(document),
                header = $('.cbp-af-header'),
                didScroll = false,
                changeHeaderOn = 300;    
          

            /**
            Initializaiton function which runs at object instantiation time.

            @method init
            **/
            function init() { 
                console.log('hey now hello there');

                // Init Skrollr
                var s = skrollr.init({
                            forceHeight: false
                        });
                 
                // Refresh Skrollr after resizing our sections
                s.refresh($('.homeSlide'));


                bindEvents();                                
            }

            function bindEvents() {

                console.log(didScroll);

                $(window).scroll(function(){
                    if( !didScroll ) {
                        console.log('didScroll');
                        didScroll = true;
                        setTimeout( scrollPage, 250 );
                    }
                });


                // $(window).scroll(function(event) {

                //     if( !didScroll ) {
                //         console.log('didScroll');
                //         didScroll = true;
                //         setTimeout( scrollPage, 250 );
                //     }
                // }, false );
            }

            function scrollPage() {
                var sy = scrollY();

                console.log('scrollPage');

                if ( sy >= changeHeaderOn ) {
                    $('.cbp-af-header').addClass('cbp-af-header-shrink');
                }
                else {
                    $('.cbp-af-header').removeClass('cbp-af-header-shrink' );
                }
                didScroll = false;
            }

            function scrollY() {

                console.log('scrollY');

                return window.pageYOffset || docElem.scrollTop;
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
