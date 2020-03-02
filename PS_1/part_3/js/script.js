$(function(){   
    $('.nav__link, #buy-now').click(function(e){
        e.preventDefault();
        const cor = $(this).attr('href');
        const h = $(window).height();  
        $('html').on("mousewheel", function(){
            $(this).stop();
        });

        $('html').animate({ 
            scrollTop: $(cor).offset().top - h / 2
        }, 1000); 
    });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > $('.header').height()) {
            $('.scroll__top').show();
            $('.scroll__top').click(function (){ 
            $('html').on("mousewheel", function(){
                $(this).stop();
            });
            $('html').stop().animate({ 
            scrollTop: $('#top').offset().top
                }, 1000);
            });
        } else {
            $('.scroll__top').hide();
        }
    });

  
});