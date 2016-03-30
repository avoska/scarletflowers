/**
 * Custom
 *
 * Hanles the main form funcitons that is displayed in the Dale
 * homepages.
 *
 * Dependencies: jQuery, Waypoint, Easing
 *
 * Copyright 2014 Empirical Themes LLC
 */


var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

function cart(id, direction) {
    var current = $(".buy[id=" + id + "]").children('input');
    var cost = $(".buy[id=" + id + "]").parent('.catalog1__count').find('.price');
    var curVal = current.val();
    if (parseInt(curVal) < 0) curVal = 0;
    if (direction == true) {
        current.val(parseInt(curVal) + 1);
    } else {
        if (parseInt(curVal) > 1) current.val(parseInt(curVal) - 1);
    }
    cost.text(parseInt(cost.data('price')) * current.val());
};

$('.buy input').change(function() {
    var price = $(this).parent('.buy').parent('.catalog1__count').find('.price');
    var price = $(this).parent('.buy').parent('.catalog1__count').find('.price');
    price.text(parseInt(price.data('price')) * $(this).val())
});

function _invisibleDimensions(_el) {
    $(_el).css({
        'display': 'block',
        'visibility': 'hidden'
    });
    var _dim = $(_el).outerHeight();
    $(_el).css({
        'display': 'none',
        'visibility': 'visible'
    });
    return _dim;
}

// Sorting
var $container = $('#list_catalog1 .row').isotope({
  itemSelector: '.col-sm-6',
  transitionDuration: 0,
  getSortData: {
    priceDown: function( itemElem ) {
      var price = $( itemElem ).find('.price').text();
      return parseFloat( price );
      // return parseFloat( price.replace( /[\(\)]/g, '') );
    },
    priceUp: function( itemElem ) {
      var price = $( itemElem ).find('.price').text() * -1;
      return parseFloat( price );
      // return parseFloat( price.replace( /[\(\)]/g, '') );
    }
  }
});

$('.sort-controllers').on( 'click', 'a', function(e) {
    e.preventDefault();
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });

$('.sort-controllers').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'a', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

jQuery(document).ready(function($) {

    //alert(half_scrollBottom);
    //var gran = $('.feature-list .col-md-4:gt(13)').scrollTop() + $('.feature-list .col-md-4:gt(13)').height();
    // alert(gran);

    // $(window).scroll(function() {
    //    if($(window).scrollTop >= $('.feature-list .col-md-4:gt(13)').scrollTop() + $('.feature-list .col-md-4:gt(14)').height() )
    // });
    //$('.feature-list .col-md-4:gt(14)').hide();


    $(window).on('load resize', function() {
        if ($(window).width() <= 1023) {
            $('.content-section-spec').height($('.content-section-spec').width() / 2.95);
        } else {
            $('.content-section-spec').height('');
        }
    });

    $(window).scroll(function() {
        $('.toggle-menu').removeClass('on');
        $('.menu__wrap').slideUp('slow');
    });


    $('.catalog1__count .buy input').val(1);
    if ($(window).width() > 991) {
        $('.catalog1__title').equalHeights();
    }

    $(".buy i").on('click', function() {
        cart($(this).parent('.buy').attr('id'), true);
    });

    $(".buy u").on('click', function() {
        cart($(this).parent('.buy').attr('id'), false);
    });

    $('.btn_more').on('click', function() {
        var current = $(this).parent('.btn_catalog1').parent('.catalog1').parent('.col-md-4');
        if ($(this).parent('.btn_catalog1').find('.info_tovar').is(":hidden")) {
            $('.btn_catalog1').find('.info_tovar').slideUp();
            var height = _invisibleDimensions($(this).parent('.btn_catalog1').find('.info_tovar'));
            $(this).parent('.btn_catalog1').find('.info_tovar').slideDown();
            $('#list_catalog1 .container .col-md-4').css('transform', 'translate(0,0)');
            if ($(window).width() > 991) {
                $('#list_catalog1').animate({
                    'padding-bottom': 33 + height + 'px'
                }, 500);
                $('#list_catalog1 .container .col-md-4:nth-of-type(3n+' + (current.index() + 4) + ')').css('transform', 'translate(0,' + height + 'px)');
            }
        } else {
            ($(this).parent('.btn_catalog1').find('.info_tovar').is(":visible"))
            $(this).parent('.btn_catalog1').find('.info_tovar').slideUp();
            if ($(window).width() > 991) {
                $('#list_catalog1 .container .col-md-4').css('transform', 'translate(0,0)');
                $('#list_catalog1').animate({
                    'padding-bottom': '33px'
                }, 500);
            }
        }
    });

    $('.magnific-gallery').each(function() {

        $(this).magnificPopup({
            delegate: 'a',
            type: "image",
            mainClass: 'my-mfp-zoom-in',
            removalDelay: 200,
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure zoom-anim-dialog');
                    this.st.mainClass = 'my-mfp-zoom-in';
                    if (!isMobile) {
                        $('.navigation').css('padding-right', '16px');
                    }
                },
                open: function() {
                    if ($(window).width() < 480) {
                        // $('body .mfp-arrow').css('display', 'none');
                        $('body .mfp-arrow').css({
                            'margin-left': '-5%',
                            'margin-right': '-5%'
                        });
                    }
                },
                close: function() {
                    if (!isMobile) {
                        $('.navigation').css('padding-right', 'auto');
                    }

                }
            },
            midClick: true,
            closeOnContentClick: false,
            gallery: {
                enabled: true,
                preload: [0, 2],
                tPrev: 'Previous (Left arrow key)',
                tNext: 'Next (Right arrow key)'
            },
        });
    });

    $('.btn__popup').click(function() {
        var text = $(this).parent('.btn_catalog1').parent('.catalog1').children('.catalog1__title').text();
        var price = $(this).parent('.btn_catalog1').parent('.catalog1').children('.catalog1__count').children('.buy').children('input').val();
        $('.popupForm__hidden').val(text);
        $('.popupForm__hiddenPrice').val(price);
    }).magnificPopup({
        type: "inline",
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 200,

        midClick: true,
        closeOnContentClick: false,
    });

    $('.callMe__button').magnificPopup({
        type: "inline",
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 200,
        midClick: true,
        closeOnContentClick: false,
    })

    $(window).resize(function() {
        $('#list_catalog1 .container .col-md-4').css('transform', 'translate(0,0)');
        $('#list_catalog1').css({
            'padding-bottom': '33px'
        });
        $('.catalog1__title').css('height', 'auto');
        if ($(window).width() > 991) {
            $('.catalog1__title').equalHeights();
        }
        $('.tovar_katalog').height($('.tovar_katalog').width());
    });

    // Setup WOW to only animate things below, uncomment/comment this line to fit your needs
    $(".anim").waypoint(function() {
        $(this).removeClass("anim");
    }, {
        triggerOnce: true,
        offset: "-95%"
    });

    // Remove backstretch dependancy
    if ($.isFunction($.fn.backstretch)) {
        $(".slider-wrapper").backstretch(["images/slider/slide-wrapper.jpg"]);
        if (window.devicePixelRatio >= 2) {
            $("section.blur,.slug .overlay").backstretch(["images/design/video-section-bg-retina.jpg"]);
            $(".slug .overlay,section.fixed .overlay").backstretch(["images/design/video-section-bg-opac-retina.png"]);
        } else {
            $("section.blur,.slug .overlay").backstretch(["images/design/video-section-bg.jpg"]);
            $(".slug .overlay,section.fixed .overlay").backstretch(["images/design/video-section-bg-opac.png"]);
        }
    }

    // Remove the master slider's dependancy
    if (typeof MasterSlider === 'function') {
        // Laptop slider
        var testimonials = new MasterSlider();
        testimonials.setup('testimonials', {
            space: 0,
            fullwidth: true,
            loop: true,
            autoplay: true,
            overPause: false,
            speed: 20,
            width: 500,
            view: "fade",
            height: 500
        });

        $(".ms-nav-next#tNext").click(function() {
            testimonials.api.next();
        });

        $(".ms-nav-prev#tPrev").click(function() {
            testimonials.api.previous();
        });
    }

    // Create the homepage down pointer thing
    var chevronDown = $(".slider-wrapper i.fa#go-down");
    if (chevronDown.length) {
        function animate() {
            $(chevronDown).animate({
                bottom: '35px',
                paddingBottom: "20px",
                opacity: .1
            }, 1000, "easeOutExpo", function() {
                $(this).animate({
                    bottom: "15px",
                    paddingBottom: "0",
                    opacity: .5
                }, 1000, "easeOutBounce");
            });
        }
        setTimeout(function() {
            $(chevronDown).css({
                bottom: '35px',
                opacity: 0,
                display: 'block'
            });
            setInterval(animate, 2000);
        }, 6000);
    }


    /***************************
     *** SMOOTH ANCHOR SCROLL ***
     ***************************/
    $('.navbar a[href*=#]:not([href=#])').click(function(e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if ($(window).width() < 768) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 54
                    }, 1000);
                } else {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 87
                    }, 1000);
                }
            }
        }
    });
    /***************************
     *** SMOOTH ANCHOR SCROLL ***
     ***************************/
    $('.menu__wrap li a').click(function(e) {
        e.preventDefault();
        $('.menu__wrap').hide();
        $('.toggle-menu').removeClass('on');
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 54
                }, 1000);
            }
        }
    });
    $('.anchor__btn').click(function(e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if ($(window).width() < 768) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 54
                    }, 1000);
                } else {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 87
                    }, 1000);
                }
            }
        }
    });


    $('#scrollup').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });

    // Initialize the parallax background
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: -400
    });

    /************************
     ****** NiceScroll *****
     *************************/
    // Remove NiceScroll dependacny
    /************************
     ** Portfolio functions **
     *************************/
    // Go ahead and resize the gallary
    resizeGallary(true);

    // Remove isotope dependancy
    if ($.isFunction($.fn.isotope)) {
        // cache container
        var $container = $('.gallary ul');
        // initialize isotope
        $container.isotope({
            // options...
            easing: "easeOutCirc",
            resizable: false // We will handle this
        });

        // filter items when filter link is clicked
        $('#filters a').click(function(e) {
            e.preventDefault();

            if ($(this).hasClass("hot")) return;

            $("#filters a.hot").removeClass("hot");
            $(this).addClass("hot");

            e.preventDefault();
            $container.isotope({
                filter: $(this).attr('data-filter')
            });
        });

        // Remove _.debounce dependency (underscorejs)
        if (typeof _.debounce === 'function') {
            var lazyLayout = _.debounce(function calculateLayout() {
                resizeGallary(false); // Resize the gallary
                $container.isotope('reLayout') // Resize the isotope
            }, 300);

            $(window).resize(lazyLayout);
        }
    }

    // Remove _.debounce dependency (underscorejs)
    if (typeof _.debounce === 'function') {
        var menuLazyLayout = _.debounce(function calculateLayout() {
            // Remove the mini nav if its visible
            if ($(window).width() > 767 && $(".navbar ul.mini:visible").length) $(".navbar-toggle").click();

            // Remove the margin-top on the panels if visible
            if ($("ul.panels li")) $("ul.panels li.active").removeClass("active").trigger("mousedown");

        }, 300);
        $(window).resize(menuLazyLayout);
    }

    /**
     * The resizeGallary function calculates the image dementions
     * based off of the current browser window size.
     *
     * @param isFirst    - Set this to true if this is the first
     *                        time callibarting the image sizes
     */
    function resizeGallary(isFirst) {
        var columns = 4;
        if ($(window).width() <= 1200) columns = 3;
        if ($(window).width() <= 870) columns = 2;
        if ($(window).width() <= 480) columns = 1;

        var widthScaleFactor = (columns * 3) / 4;
        var imgWidth = Math.floor($(window).width() / columns);
        var imgHeight = (imgWidth * widthScaleFactor) / columns;
        var childIndex = 0;

        if (isFirst) $(".gallary .preview").fadeOut(400);

        $(".gallary li").each(function() {
            // ratio is 4/3 (width/height)
            $(this).css("width", imgWidth);
            $(this).css("height", imgHeight);
        });

        if (isFirst) {
            $(".portfolio").waypoint(function() {
                $(".gallary li img").each(function() {
                    $(this).css({
                        opacity: "0",
                        top: "-50px",
                        display: "block"
                    });
                    var el = this;
                    setTimeout(function() {
                        $(el).animate({
                            opacity: "1",
                            top: "0"
                        }, 1800, "easeOutExpo");
                    }, 190 * childIndex++);
                });
            }, {
                offset: 500,
                triggerOnce: true
            });
        }
    }

    function add_hover_effect(el) {

        var desc = typeof $(el).data("title") === 'undefined' ? "" : $(el).data("title");
        var icon = typeof $(el).data("icon") === 'undefined' ? "fa-eye" : $(el).data("icon");
        var start = typeof $(el).data("start") === 'undefined' ? 0 : $(el).data("start");
        var fadeIn = typeof $(el).data("fadeIn") === 'undefined' ? 500 : parseInt($(el).data("fadeIn"));
        var fadeOut = typeof $(el).data("fadeOut") === 'undefined' ? 200 : parseInt($(el).data("fadeOut"));
        var zoom = typeof $(el).data("zoom") === 'undefined' ? false : true;

        if (start == "top")
            start = -100;
        else if (start == "bottom")
            start = 100;

        $('<span class="desc"><i class="fa ' + icon + '"></i><span class="title">' + desc + '</span></span>').css({
            opacity: 0,
            top: start + "%"
        }).appendTo($(el));

        $(el).hover(function() {
            $(el).find("span.desc").stop().animate({
                opacity: 1.00,
                top: 0
            }, fadeIn, "easeOutCirc");
        }, function() {
            $(el).find("span.desc").stop().animate({
                opacity: 0.00,
                top: start + "%"
            }, fadeOut, "easeOutCirc");
        });

        if (zoom) {

        }

        // Allow chaining
        return el;
    }

    // Add hover effect
    $("a#desc").each(function() {
        add_hover_effect(this);
    });

    /************************
     ****** Team Functions ***
     *************************/
    $(".member-box").each(function() {
        $(this).find(".progress .progress-bar").css("width", "0");
    });

    $(".team .ms-slide").mouseover(function() {
        // Add the scroll effect if it isn't already there
        if (!$(this).hasClass("linked")) {
            $(this).addClass("linked");
            var dataTitle = typeof $(this).data("title") === 'undefined' ? "" : 'data-title="' + $(this).data('title') + '"';
            add_hover_effect($("<a href='#' " + dataTitle + " id='desc'></a>").appendTo($(this).find(".ms-slide-bgcont")).prepend($(this).find("img"))).trigger("mouseover");
        }
    });

    $(".team .ms-slide").click(function(e) {
        // Prevent the page from scrolling upwards
        e.preventDefault();
        var scrollToPos = $(window).width() < 1200 ? "-475px" : "-80px";

        $(".member-box#" + $(this).data("member-id")).css({
            opacity: 0,
            top: "-200px",
            display: "block"
        }).stop().animate({
            opacity: 1,
            top: scrollToPos
        }, 600, "easeOutCirc", function() {
            $(this).find(".progress .progress-bar").filter(function() {
                return $(this).css("width") == "0px";
            }).each(function() {
                $(this).animate({
                    width: $(this).data("value") + "%"
                }, 400, "easeInExpo", function() {
                    $(this).addClass("animated");
                });
            });
        });
    });

    // If user presses the close key
    $(".member-box a#close").click(function(e) {
        // Prevent the page from scrolling upwards
        e.preventDefault();
        $(this).parents(".member-box").stop().fadeOut(200);
    });

    var smallest = Number.MAX_VALUE;
    var largest = Number.MIN_VALUE;
    var c = 0;
    // Retrieve the highest/lowest values
    var highest = $(".ms-slide").each(function() {
        c = parseInt($(this).data("member-id"));
        if (c < smallest) smallest = c;
        if (c > largest) largest = c;
    });

    // If user presses esc key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $(".member-box a#close").click();
        } else if (e.keyCode == 37) { // Pdd left
            var id = parseInt($(".member-box:visible").attr("id"));
            --id;
            $(".member-box a#close").click(); // Close all the open boxes
            if (!$(".member-box#" + id).length) id = largest;
            $(".ms-slide").filter(function() {
                return $(this).data("member-id") == id;
            }).click();
        } else if (e.keyCode == 39) { // Pad right
            var id = parseInt($(".member-box:visible").attr("id"));
            ++id;
            $(".member-box a#close").click(); // Close all the open boxes
            if (!$(".member-box#" + id).length) id = smallest;
            $(".ms-slide").filter(function() {
                return $(this).data("member-id") == id;
            }).click();
        }
    });

    /************************
     ****** Progress Bars ****
     *************************/
    $(".progress .progress-bar").each(function() {
        // Make sure this bar doens't have a member-box parent
        if ($(this).parents(".member-box").length) {
            return;
        }
        $(this).waypoint(function() {
            var anim = typeof $(this).data("value") === 'undefined' ? 0 : parseFloat($(this).data("value"));
            $(this).animate({
                width: anim + "%"
            }, 600, 'easeInCirc');
        }, {
            offset: "95%",
            triggerOnce: true
        });
    });

    /************************
     ****** Number List ******
     *************************/
    // Remove countUp dependancy
    if (typeof countUp === 'function') {
        var i = 0;
        $("ul.number-list li").each(function() {
            var span = $(this).children("span").attr("id", "count" + i);
            var amount = typeof $(this).data("amount") === 'undefined' ? 0 : parseInt($(this).data("amount"));
            var numAnim = new countUp("count" + i, 0, amount, 0, 5);
            $(this).waypoint(function() {
                numAnim.start();
            }, {
                offset: "67%",
                triggerOnce: true
            });
            ++i;
        });
    } else {
        if ($("ul.number-list").length > 0) {
            console.log("CountUp function not found.");
        }
    }

    /************************
     ****** Accordion ******
     *************************/
    $("ul.accordion").each(function() {
        $(this).css("height", $(this).height() + "px");

        $(this).children("li").each(function() {
            var a = $(this).children("span").children("a");
            if ($(this).hasClass("active"))
                $(a).append('<i class="fa fa-chevron-down"></i>');
            else
                $(a).append('<i class="fa fa-chevron-right"></i>');

            var parent = this;
            $(a).click(function(e) {
                e.preventDefault();
                if (!$(parent).hasClass('active')) {
                    $("ul.accordion li.active article").slideUp(250, "easeOutExpo", function() {
                        $(this).parent("li").removeClass("active");
                        $(this).siblings("span").children("a").children("i").removeClass("fa-chevron-down").addClass("fa-chevron-right");
                    });
                    $(parent).addClass("active").children("article").slideDown(250, "easeOutExpo");
                    $(a).children("i").removeClass("fa-chevron-right").addClass("fa-chevron-down");
                }
            });
        });
    });

    /************************
     ****** Search Bar *******
     *************************/
    $(".navbar-form i.fa").click(function() {
        if ($(this).hasClass('fa-search')) {
            $(".search-field").fadeIn(400).find("input").focus();
            $(this).fadeOut(105, function() {
                $(this).siblings("i.fa-times").fadeIn(200);
            });
        } else { // Pressed the times icon
            $(".search-field").fadeOut(400);
            $(this).fadeOut(105, function() {
                $(this).siblings("i.fa-search").fadeIn(200);
            });
        }
    }).hover(function() {
        $(this).animate({
            color: "#6ebff3"
        }, 400);
    }, function() {
        $(this).animate({
            color: "#868686"
        }, 400);
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $(".navbar-form i.fa-times").click();
        }
    });

    /************************
     ***** EasyPieChart *****
     ************************/
    // Remove easyPieChart's dependancy
    if ($.isFunction($.fn.easyPieChart)) {
        $('.chart').easyPieChart({
            easing: 'easeOutExpo',
            trackColor: false,
            barColor: '#ffffff',
            lineWidth: 4,
            size: 140,
            lineCap: 'square',
            animate: 2500,
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent) + "%");
            }
        });
        var i = 0;
        $('.chart').each(function() {
            $(this).waypoint(function() {
                var el = this;
                setTimeout(function() {
                    $(el).data('easyPieChart').update($(el).data('value'));
                }, (i++) * 100);
            }, {
                offset: "90%",
                triggerOnce: true
            });
        });
    } else if ($('.chart').length) {
        console.log("easyPieChart function not found");
    }

    /************************
     *** Revolution Slider ***
     ************************/
    // Remove the Revolution slider's dependancy
    if ($.isFunction($.fn.revolution)) {
        $('.slider-wrapper').revolution({
            delay: 9000,
            startwidth: 960,
            startheight: 820,
            autoHeight: "on",
            fullScreenAlignForce: "off",

            onHoverStop: "on",

            hideThumbsOnMobile: "off",
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResoluition: 0,

            hideThumbs: 0,
            hideTimerBar: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "round",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 30,
            navigationVOffset: 30,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,


            touchenabled: "on",
            swipe_velocity: "0.7",
            swipe_max_touches: "1",
            swipe_min_touches: "1",
            drag_block_vertical: "false",

            stopAtSlide: -1,
            stopAfterLoops: -1,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            hideSliderAtLimit: 0,

            dottedOverlay: "none",

            fullWidth: "off",
            forceFullWidth: "off",
            fullScreen: "off",
            fullScreenOffsetContainer: "#topheader-to-offset",

            shadow: 0

        });
    }

    // Remove parallax dependancy
    if ($.isFunction($.fn.parallax)) {
        // Initialize the parallax background
        $('#parallax').parallax({
            calibrateX: true,
            calibrateY: true,
            invertX: true,
            invertY: true,
            limitX: 1000,
            limitY: 300,
            scalarX: 20,
            scalarY: 20,
            frictionX: .2,
            frictionY: 0.5
        });
    }

    /************************
     *** Sticky navigation ***
     ************************/


    /*****************************
     ****** DropDown Setup ********
     *****************************/
    var count = 0;
    $(".dropdown").each(function() {
        $(this).attr("id", "drop" + (count++));
        $(this).removeClass("h").children("a").append('<i class="fa  fa-angle-down"></i>');
        var tO = null;
        $(this).mouseenter(function() {
            var el = this;
            tO = setTimeout(function() { // Ensure the user intends to drop the menu
                $(el).find(".dropdown-menu").stop().fadeIn(200);
            }, 235);
        }).mouseleave(function() {
            clearTimeout(tO);
            $(this).find(".dropdown-menu").stop().fadeOut(200);
        });
    });
    $(".dropdown.full").each(function() { // Reposition menu
        var section = $(this).find("section.dropdown-menu");
        var destLoc = -(parseInt($(this).attr("id").replace('drop', '')) * 114);
        $(section).css({
            left: destLoc + "px"
        });
    });

    /**************************
     **** MINI Navigation ******
     **************************/
    // Set up the mini navigation first
    $("ul.navbar-nav").children("li").each(function() {
        // Check to see what kind of list element this is
        if ($(this).hasClass("dropdown")) {
            // If it is a dropdown, then we have more work to do
            var cloned = $(this).clone();
            if ($(cloned).hasClass("full")) {
                var newListElement = $('<li class="sub dropdown"><i class="fa fa-chevron-right"></i><ul></ul></li>');
                // Find the first link (don't know why the user would create more, but adding [0] ensures
                // we are only using the first
                $($(cloned).children('a')[0])
                    .find("i.fa")
                    .remove()
                    .end()
                    .prependTo(newListElement);
                // Loop through every individual sub-list element
                $(cloned).find("li").each(function() {
                    // Find the element, remove the inner chevron, append it to the sub <ul> tag
                    $(this).find("i.fa")
                        .remove()
                        .end()
                        .appendTo($(newListElement).find("ul"));
                });
                // Finally, append the list element to the main nav
                $(newListElement).appendTo("ul.mini");
            } else {
                // Duplicate the link, add a chevron to it, then remove the inner link used
                // in the main navigation
                cloned.addClass("sub").prepend('<i class="fa fa-chevron-right"></i>')
                    .appendTo("ul.mini")
                    .find(".dropdown-menu")
                    .removeClass("dropdown-menu")
                    .end()
                    .find("a i.fa")
                    .remove()
                    .end();
            }
            cloned = null;
        } else {
            // No dropdown, copy the element to the navigation
            $(this).clone().appendTo("ul.mini");
        }
    });

    var menu = $(".navigation ul.mini");
    var navM = $(".navigation");
    $(".navbar-toggle").click(function() {
        if (!$(navM).is(":animated")) {
            if (!$(navM).hasClass("down")) {
                $(navM).animate({
                    height: "+=203"
                }, 350, "easeOutExpo");
                $(menu).slideDown(400, "easeOutExpo", function() {
                    $(navM).addClass("down");
                });
            } else {
                $(navM).animate({
                    height: "-=203"
                }, 250, "easeOutExpo", function() {
                    $(navM).removeClass("down");
                    $(this).css('height', '');
                });
                $(menu).slideUp(200, "easeOutExpo");
            }
        }
    });
    $(".navbar ul.mini i.fa").on("click", document, function(e) {
        e.preventDefault();
        if ($(this).hasClass("fa-chevron-right")) {
            $(this).removeClass('fa-chevron-right').addClass("fa-chevron-down").siblings("ul").slideDown(400, "easeOutExpo");
        } else {
            $(this).addClass('fa-chevron-right').removeClass("fa-chevron-down").siblings("ul").slideUp(400, "easeOutExpo");
        }
    });

    /**************************
     ****        TABS         ******
     **************************/
    $(".tabs").each(function() {
        var panels = $(this).children("ul.panels");
        var panelHeight = parseInt($(panels).height());
        $(panels).find("li").each(function() {
            $(this).find("a").click(function(e) {
                e.preventDefault();
            });
            $(this).prepend("<span></span>");
            $(this).mousedown(function(e) {
                if (!$(this).hasClass("active")) {
                    $(".tab-content#" + $(this).parent("ul.panels").find("li.active").removeClass("active").data("tab-id")).fadeOut(400);
                    $(".tab-content#" + $(this).addClass("active").data("tab-id")).fadeIn(400);
                    // Retrieve the height of the new section
                    var contentHeight = parseInt($(".tab-content#" + $(this).addClass("active").data("tab-id")).height());
                    if ($(window).width() > 1199) {
                        $("#tab-content-wrapper").css("margin-bottom", "0");
                        $(".tab-content#" + $(this).data("tab-id")).css({
                            height: contentHeight + "px"
                        });
                        $(panels).stop().animate({
                            "height": contentHeight + "px"
                        }, 535, "easeOutExpo");
                        $(panels).children(":first").stop().animate({
                            "margin-top": (Math.abs(panelHeight / 2 - contentHeight / 2)) + "px"
                        }, 535, "easeOutExpo");
                    } else {
                        // Remove the top padding
                        $("ul.panels li:first").css("margin", "0");
                        // Animate the wrapper's height
                        $("#tab-content-wrapper").stop().animate({
                            height: (contentHeight) + "px",
                            marginBottom: "65px"
                        }, 535, "easeOutExpo");
                    }
                }
            });
            if ($(this).hasClass("active")) {
                $(this).removeClass("active").trigger("mousedown");
            }
        });
    });

    /**************************
     ****     SIDEBAR     ******
     **************************/
    $(".search-wrapper input").on('focus', document, function() {
        $(this).parent(".search-wrapper").animate({
            boxShadow: "inset 2px 2px 2px 0px rgba(0,0,0,0.05)"
        }, 100, "easeOutExpo");
    }).on('blur', document, function() {
        $(this).parent(".search-wrapper").animate({
            boxShadow: "inset 0 0 0 0 rgba(0,0,0,0,0)"
        }, 100, "easeOutExpo");
    });

    $(".search-wrapper i.fa").click(function() {
        $(this).parents("form").submit();
    });

    // Hover post functionality
    $(".sidebar ul.posts li").each(function() {
        var tO = new Array();
        $(this).mouseenter(function() {
            $(this).find(".hover").stop().fadeIn(535, "easeOutExpo");

            $(this).find("span").css({
                display: "inline-block",
                opacity: 0
            }).each(function(index, element) {
                tO.push(setTimeout(function() {
                    $(element).stop().animate({
                        opacity: 1
                    }, 435, "easeOutExpo");
                }, 100 * index + 135));
            });

        }).mouseleave(function() {
            for (var i = 0; i < tO.length; i++) clearTimeout(tO[i]);
            $(this).find('.hover').stop().fadeOut(200, "easeOutExpo");
        });
    });

    // jQuery.support.transition
    // to verify that CSS3 transition is supported (or any of its browser-specific implementations)
    $.support.transition = (function() {
        var thisBody = document.body || document.documentElement,
            thisStyle = thisBody.style,
            support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;

        return support;
    })();
}); // End of script

$(function() {
    var wrapper = $(".file_upload"),
        inp = wrapper.find("input"),
        btn = wrapper.find(".button"),
        lbl = wrapper.find("mark");

    // Crutches for the :focus style:
    inp.focus(function() {
        wrapper.addClass("focus");
    }).blur(function() {
        wrapper.removeClass("focus");
    });

    var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

    inp.change(function() {
        var file_name;
        if (file_api && inp[0].files[0])
            file_name = inp[0].files[0].name;
        else
            file_name = inp.val().replace("C:\\fakepath\\", '');

        if (!file_name.length)
            return;

        if (lbl.is(":visible")) {
            lbl.text(file_name);
            btn.text("Прикрепить фото букета");
        } else
            btn.text(file_name);
    }).change();

});
$(window).resize(function() {
    $(".file_upload input").triggerHandler("change");
});
var magnificPopup = $.magnificPopup.instance;


$(".form1").validate({
    rules: {
        Телефон: {
            required: true,
        },
    },
    submitHandler: function(form) {
        var formData = new FormData($(form)[0]);
        var error = false;
        var error_text = "";
        if ($('.my_file1')[0].files[0]) {
            var type = $('.my_file1')[0].files[0].type;
            var size = $('.my_file1')[0].files[0].size;
            if (type != 'image/jpeg' && type != 'image/png') {
                error = true;
                error_text += "Неверный формат файла, разрешены jpeg/png \n";
            }
            if (size > 3 * 1024 * 1024) {
                error_text += "Размер файла слишком большой, максимальный размер 3Мб \n";
                error = true;
            }
        }
        if (!error) {
            magnificPopup.open({
                items: {
                    src: '.ajax-in-progress'
                },
                type: 'inline'
            });
            $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                url: "mail.php",
                data: formData
            }).done(function() {
                magnificPopup.close();
                alert("Спасибо за заявку, в ближайшее время мы с вами свяжемся");
                setTimeout(function() {
                    $(".form1").trigger("reset");
                }, 1000);

            });
        } else alert(error_text);
        return false;
    }
})

$("img, a").on("dragstart", function(event) {
    event.preventDefault();
});

$(".toggle-menu").click(function() {
    $(this).toggleClass("on");
    $(".menu__wrap").slideToggle();
    return false;
});


jQuery.extend(jQuery.validator.messages, {
    required: "Это обязательное поле",
    minlength: jQuery.validator.format("Введите как минимум {0} символов."),
})

$(".popupForm__right").validate({
    rules: {
        Телефон: {
            required: true,
        },
    },
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize()
        }).done(function() {
            alert("Спасибо за заявку, в ближайшее время мы с вами свяжемся");
            magnificPopup.close();
            setTimeout(function() {
                $(".popupForm__right").trigger("reset");
            }, 1000);

        });
        return false;
    }
});

$('.callMe').validate({
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize()
        }).done(function() {
            alert("Спасибо за заявку, в ближайшее время мы с вами свяжемся");
            magnificPopup.close();
            setTimeout(function() {
                $(".popupForm__right").trigger("reset");
            }, 1000);

        });
        return false;
    }
})



jQuery(document).ready(function($) {

    /************************
     ****** MasterSlider *****
     *************************/
    // Calibrate slider's height
    var sliderHeight = 880; // Smallest hieght allowed (default height)
    var minheight = 400;
    var winHeight = $(window).height();
    sliderHeight = winHeight > sliderHeight ? winHeight : sliderHeight;
    // Initialize the main slider



    $(window).resize(function() {
        $('.tovar_katalog').height($('.tovar_katalog').width());
    });

    $(window).load(function() {
        $('.loaderInner1').fadeOut();
        $('.loader1').delay(100).fadeOut(1000);
        setTimeout(function() {
            $('.tovar_katalog').height($('.tovar_katalog').width());
        }, 200)
        $('#main.row').css('height', '400px');
        if (typeof WOW === 'function' && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            // Initialize WOW
            wow = new WOW({
                boxClass: 'anim',
                animateClass: 'animated', // default
                offset: 0 // default
            });
            wow.init();
        }

    });

});
