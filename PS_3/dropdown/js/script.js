let textSelect = 'Select Friend';
const OPTION = ['Mary Smit','Bobby Tot','Den','Tom Cat'];
let fClick = false;
let f = false;
const fClickEvent = () => {
    if(!fClick){
        $('.btn-tr').text('▲');
        fClick = !fClick;
    } else {
        $('.btn-tr').text('▼');
        fClick = !fClick;
    }
};

$(function() {
    let optionStr = '';
    for(let i = 0; i < OPTION.length; i++){
        optionStr += `<li>${OPTION[i]}</li>`
    }
   
    $('.dropdown .text').text(textSelect);
    $('.dropdown').wrap('<div class="wrp"></div>');
    $('.wrp').append('<ul class="option"></ul>');
    $('.option').append(optionStr).hide();
    $('.wrp').addClass('wrp-hover');
    $('.wrp').on('click', function(e) { 
        e.stopPropagation();
        $(this).find('.option').stop().slideToggle(600);
        $(this).removeClass('wrp-hover');
        $(this).addClass('wrp-border');
        $(this).find('.dropdown').toggleClass('dropdown-active', fClickEvent());
    });

    $('.option li').on('click', function(e) {
        e.stopPropagation();
        if(fClick){
            $('.dropdown .text').css('color', '#222f3e');
            let str = $(this).text();
            $('.dropdown .text').text('');
            for(let i = 0; i < str.length; i++){
                setTimeout(() =>  $('.dropdown .text').append(`<span class="animateLetter">${str[i]}</span>`), i * 100); 
            }
            $('.option').slideUp(600);
            $(`.dropdown[class*='dropdown-active']`).removeClass('dropdown-active');
            if(fClick){
                $('.btn-tr').text('▼')
                fClick = !fClick;
            }
        }
    });

    $('.container').on('click', () => {
        $('.wrp').removeClass('wrp-border');
        $('.wrp').addClass('wrp-hover');
        $('.option').slideUp(600);
        $(`.dropdown[class*='dropdown-active']`).removeClass('dropdown-active');
        if(fClick){
            $('.btn-tr').text('▼')
            fClick = !fClick;
        }
    });

});
