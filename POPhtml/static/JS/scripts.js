$(document).ready(() => {
    var login = $("#login_form")
    var reg = $("#reg_form")

    $('#login_butt').on('click', function(){
        $(login).toggleClass('hide block');
        $(reg).addClass('hide');
        $(reg).removeClass('block');
    });

    $('#register_butt').on('click', function(){
        $(reg).toggleClass('hide block');
        $(login).addClass('hide');
        $(login).removeClass('block');
    });
});