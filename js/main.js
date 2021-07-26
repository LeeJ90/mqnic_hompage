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
    var window_width = $( window ).width();

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
            visible_banner_first_no = banner_total_count - (banner_total_count % visible_banner_count);
        }
        console.log(visible_banner_first_no);   
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