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

                new fy.canvasDisplay();
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
                            slideWidth = $(this).data('content');

                        $('.arrow-up').css({
                            'left':arrowPos
                        });

                        console.log(slideWidth);

                        $('.slide-content').css({
                            'right':slideWidth
                        });
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

    $.canvasDisplay = function () { 

        function init(){
            console.log('canvas');
        }

        init();
    };

} (jQuery));

$(function() {
    new fy.main();
});
