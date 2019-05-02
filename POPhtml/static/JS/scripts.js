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

    $('#reg').on('keyup', function(){
        var format = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = $(this).val();

        if(format.test(email)) {
            $('#reg').css('backgroundColor', '#1cc930')
            $('#reg_submit').attr('disabled', false);
        }
        else {
            $('#reg').css('backgroundColor', '#f9f9f9');
        }
    });

    $('#showpwd').on('click', function() {
        
        if ($('#passw').attr('psswd-shown') == 'false') {
            
            $('#passw').removeAttr('type');
            $('#passw').attr('type', 'text');
            
            $('#passw').removeAttr('psswd-shown');
            $('#passw').attr('psswd-shown', 'true');
            
            $('#showpwd').html('Dölj lösenord');
            
        }else {
            
            $('#passw').removeAttr('type');
            $('#passw').attr('type', 'password');
            
            $('#passw').removeAttr('psswd-shown');
            $('#passw').attr('psswd-shown', 'false');
            
            $('#showpwd').html('Visa lösenord');
            
        }
    });

});