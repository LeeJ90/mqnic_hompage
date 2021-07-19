$(function($) {

    $(function scroll_animate() {
        $(".scroll").animate({
            top: '-30'
        }, 500, function() {
            $( this ).animate( {
                top: '-50'
            }, 500, scroll_animate );
        } );
    });



    $("#visual_play").on("click", function() {
        $(this).addClass("on");
        $("#visual_stop").removeClass("on");
    });

    $("#visual_stop").on("click", function() {
        $(this).addClass("on");
        $("#visual_play").removeClass("on");
    });

    // goto top
    var gototopIcon_y = $(".gototop").offset().top;
    var windowScroll_y = $(window).scrollTop() + $( window ).height();
    
    $(window).scroll(function() { 
        if(window_width>1024) { 
            windowScroll_y = $(window).scrollTop() + $( window ).height() - 80 - 50;
        } else if(window_width<1024 && window_width>480) {
            windowScroll_y = $(window).scrollTop() + $( window ).height() - 70 - 15;
        } else if(window_width<480) {
            windowScroll_y = $(window).scrollTop() + $( window ).height() - 50 - 15;
        }

        if( gototopIcon_y <= windowScroll_y ) {
            $(".gototop").css("position", "fixed");
        } else {
            $(".gototop").css("position", "absolute");
        }

    });
    
    var window_width = $( window ).width();
    if(window_width>1024) {
        var gototopIcon_y = $(".gototop").offset().top;
        var icon_height = 80;
        var icon_gap_margin = 14;
        var icon_bottom_margin = 50;
        var windowScroll_y = 0;
        var facebook_bottom_margin = 0;
    } else if(window_width<1024 && window_width>480) {
        var gototopIcon_y = $(".gototop").offset().top;
        var icon_height = 70;
        var icon_gap_margin = 14;
        var icon_bottom_margin = 166;
        var windowScroll_y = 0;
        var facebook_bottom_margin = 150;
    } else if(window_width<480) {
        var gototopIcon_y = $(".gototop").offset().top;
        var icon_height = 50;
        var icon_gap_margin = 10;
        var icon_bottom_margin = 105;
        var windowScroll_y = 0;
        var facebook_bottom_margin = 90;
    }

    // $(window).scroll(function() {    

    //     windowScroll_y = $(window).scrollTop() + $( window ).height();  // 네 마우스
    //     absolute_y = windowScroll_y - (icon_height / 2) + icon_gap_margin - (facebook_bottom_margin/2);                      // 네 마우스
    //     gototopIconBottomWithMargin_y = gototopIcon_y + icon_height + icon_bottom_margin;                   // 탑버튼 바툼까지 화면 

    //     if( gototopIcon_y <= absolute_y && windowScroll_y <= gototopIconBottomWithMargin_y  ) {
    //         $(".facebook").css("position", "absolute");
    //         $(".facebook").css("bottom", icon_height  + icon_gap_margin + icon_bottom_margin - facebook_bottom_margin);
    //         $(".gototop").css("position", "absolute");
    //     } 
    //     else if ( windowScroll_y > gototopIconBottomWithMargin_y){
    //         $(".facebook").css("position", "fixed");
    //         $(".gototop").css("position", "fixed");
    //     }
    //     else {
    //         $(".facebook").css("position", "fixed");
    //         $(".facebook").css("bottom", icon_bottom_margin);
    //         $(".gototop").css("position", "absolute");
    //     }
    // });

    $('.gototop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

    // customer & partner
    const banner_total_count = $(".banner > ul > li").length;
    let device = "";
    let visible_banner_count = 0;
    let visible_banner_first_no = 0;
    
    $.getVisibleBannerCount = function() {
        for(i=0; i<banner_total_count; i++) {
            if($(".banner > ul > li:eq("+ i +")").css('display')!=="none") {
                visible_banner_count++;
            }
        }
    }
    
    $.getVisibleBannerCount();

    $("#partner_next").on("click", function() {
        
        // init
        for(i=0; i<banner_total_count; i++) {
            $(".banner > ul > li:eq("+ i +")").css('display', 'none');
        }

        visible_banner_first_no = visible_banner_first_no + visible_banner_count;
        if(visible_banner_first_no >= banner_total_count) {
            visible_banner_first_no = 0;
        }
        
        for(i=visible_banner_first_no; i<(visible_banner_first_no+visible_banner_count); i++) {
            $(".banner > ul > li:eq("+ i +")").css('display', 'block');
        }
    });

    $("#partner_prev").on("click", function() {

        // init
        for(i=0; i<banner_total_count; i++) {
            $(".banner > ul > li:eq("+ i +")").css('display', 'none');
        }

        visible_banner_first_no = visible_banner_first_no - visible_banner_count;
        if(visible_banner_first_no < 0) {
            visible_banner_first_no = banner_total_count - visible_banner_count;
        }

        for(i=visible_banner_first_no; i<(visible_banner_first_no+visible_banner_count); i++) {
            $(".banner > ul > li:eq("+ i +")").css('display', 'block');
        }
    });

    
    // visual
    $('.visual-carousel').owlCarousel({
        margin:0,
        loop:true,
        autoWidth:true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
    });
    $('.visual-carousel').on('changed.owl.carousel', function(event) {
        var page = event.page.index + 1;
        $(".visual .bar").removeClass("active");
        
        for( i=0; i<page; i++ ) {
            $(".visual .bar").eq(i).addClass("active");
        }
        $(".visual .no.prev").html("0" + page.toString());
    })

    $('#visual_play').on('click',function(){
        $('.visual-carousel').trigger('play.owl.autoplay',[5000])
    });
    $('#visual_stop').on('click',function(){
        $('.visual-carousel').trigger('stop.owl.autoplay');
    });
    $('.carousel-indicators .bar').click(function(){
        var no = $(this).attr('data-role');
        $('.visual-carousel').trigger('to.owl.carousel', [no, 1500])
    });



    // service
    $('.service-carousel').owlCarousel({
        margin:10,
        loop:true,
        autoWidth:true,
    });
    let serviceItemsCount = 10;
    let current_item_no = 0;
    $(".prevPageRoad").on("click", function(e) {
        current_item_no = current_item_no - 1;
        if(current_item_no <= -1) {
            current_item_no = serviceItemsCount - 1;
            $(".service .pages li").addClass("active");
        }
        $('.service-carousel').trigger('to.owl.carousel', current_item_no)

        $(".service .pages li").eq(current_item_no+1).removeClass("active");
        $(".service .pages li").eq(current_item_no).addClass("active");
        
        no = current_item_no+1;
        $(".service .no.prev").html(no.toString().padStart(2,'0'));
    });
    $(".nextPageRoad").on("click", function(e) {
        current_item_no = current_item_no + 1;
        if(current_item_no >= serviceItemsCount) {
            current_item_no = 0
            $(".service .pages li").removeClass("active");
        }
        $('.service-carousel').trigger('to.owl.carousel', current_item_no);

        $(".service .pages li").eq(current_item_no).addClass("active");

        no = current_item_no+1;
        $(".service .no.prev").html(no.toString().padStart(2,'0'));
    });
});