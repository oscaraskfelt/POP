$(document).ready(() =>{
    var login = $("#login_form")
    var reg = $("#reg_form")

    $('#login_butt').on('click', function(){
        $(login).toggleClass('hide block');
        $(reg).addClass('hide');
        $(reg).removeClass('block');

    })
    $('#register_butt').on('click', function(){
        $(reg).toggleClass('hide block');
        $(login).addClass('hide');
        $(login).removeClass('block');
    })
});




/*
var login = document.getElementById("login_form")
var reg = document.getElementById("reg_form")
 

$(function(){
    $(login).hide(),
    $(reg).hide()
    });
    
$(function(){
    $('.butt').on('click', function(){
        var butts = $(this).attr('data-butts');
        $('#'+butts).slideToggle();
        console.log(butts) 
    })
});
*/