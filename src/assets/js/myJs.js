// Shorthand for $( document ).ready()
$(function() {



    // =================> loading page <==============================

    /**
     * loading page windo on load
     * it in start working automaticli
     * the code in index page
     */
    $(window).load(function() {
        $('#spinner').fadeOut(1000, function() {
            // $(this).parent().fadeOut();
        })
    });

    // =================> back to up btn <==============================
    /**
     * the AROW beside 
     * this arow make you back to up again
     * the code is in all page 
     * and it have the page scroll top hight
     */
    $(window).scroll(function() {
        var up = $('#up');
        // console.log($(this).scrollTop());
        if ($(this).scrollTop() >= 600) {
            up.fadeIn(1000);
            // console.log('function');
        } else {
            up.fadeOut(1000);
        }

    });
    // =======> to make it smothey <========
    $('#up').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 600);
    });

    // =================> niceScroll <==============================
    // niceScroll
    $("body").niceScroll({
        cursorcolor: "gray",
        cursorwidth: "6px",
        cursorborder: "none",

    });

    // =================> owl Carousel slider <==============================
    // $('.owl-carousel').owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     nav: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 5
    //         }
    //     }
    // });







});