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
            }

            function bindEvents() {

                // the element to act on if viewable
                var myelement = $('.slide-out-cc'),
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
                    if (target === 'intro') {
                        fy.scrollTo($('header'));
                    } else {
                        fy.scrollTo(  $('.'+target+''), $('.'+target+'').offset().top-$('.header-cc').outerHeight() );
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
                    slideElem = $('.slide-out-cc'),
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
