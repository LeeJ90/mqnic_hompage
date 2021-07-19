$(function($) {

    

    $(window).resize(function() {
        $.sizingLayout();
        $.menuCarousel();
    });

    $.sizingLayout = function() {

        var window_width = $( window ).width();
        var window_height = $( window ).height();
        var li_width = 100;

        if( $("body>.wrap").hasClass("main") ) {
            var head_height = $("header").height();
            $("section.visual .carousel-inner").css("width", window_width * 3)
            $("section.visual .carousel-inner li").css("width", window_width);
            $("section.visual .carousel-inner li").css("height", window_height - head_height);
            $("section.visual").css("height", window_height - head_height);
        }
        
        if(window_width>1024) {
            li_width = 159;
        } else if(window_width<1024 && window_width>480) {
            li_width = window_width / 8;
        } else if(window_width<480) {
            li_width = 100;
        }
        $(".menu-carousel li").css("width", li_width);
    }

    $.sizingLayout();

    // menu
    $.menuCarousel = function() {
        var window_width = $( window ).width();
        if(window_width<480) {
            var startPosition = $(".menu-carousel").children(".active").index();
            $(".menu-carousel li").eq(startPosition).addClass("active");
            $('.menu-carousel').owlCarousel({
                margin:0,
                loop:true,
                autoWidth:true,
                startPosition: startPosition,
                responsive:{
                    1024:{
                        items:8,
                        nav:false,
                        loop:false
                    }
                }
            });
        }
    }        

    $.menuCarousel();
    

    let menuItemsCount = 10;
    let current_menu_no = 0;
    $("#prevMenu").on("click", function(e) {
        current_menu_no = current_menu_no - 1;
        if(current_menu_no <= 0) {
            current_menu_no = menuItemsCount - 1;
        }
        $('.menu-carousel').trigger('to.owl.carousel', current_menu_no)
    });

    $("#nextMenu").on("click", function(e) {
        current_menu_no = current_menu_no + 1;
        if(current_menu_no >= menuItemsCount) {
            current_menu_no = 0
        }
        $('.menu-carousel').trigger('to.owl.carousel', current_menu_no);
    });


    $(".nav-toggler").on("click", function() {

        if( $(".nav-toggler").hasClass("icon-close") === false ) {
            $(".dropdown-navi").show();
            $(".nav-toggler").addClass("icon-close");
            $('body').css({'overflow': 'hidden', 'height': '100%'});
        } else {
            $(".dropdown-navi").hide();
            $(".nav-toggler").removeClass("icon-close");
            $('html, body').css({'overflow': 'initial', 'height': '100%'}); 
        }
    });
    
    $(".dropdown-navi .menu.service").on("click", function() {
        if( $(".dropdown-navi .sub-menu-ul").css("display") === 'none' ) {
            $(".dropdown-navi .sub-menu-ul").show();
            $(".dropdown-navi .menu.service span").addClass("up");
        } else {
            $(".dropdown-navi .sub-menu-ul").hide();
            $(".dropdown-navi .menu.service span").removeClass("up");
        }
    });

    
});