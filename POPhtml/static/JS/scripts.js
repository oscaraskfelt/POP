$(document).ready(() => {
    email_validation = false;
    password_validation = false;
    user_name = false;

    //Visar inloggningsform
    $('#login_butt').on('click', function(){
        $("#login_form").toggleClass('hide block');
        $("#reg_form").addClass('hide');
        $("#reg_form").removeClass('block');
    });

    //Visar registreringsform
    $('#register_butt').on('click', function(){
        $("#reg_form").toggleClass('hide block');
        $("#login_form").addClass('hide');
        $("#login_form").removeClass('block');
    });

    // Validerar att användarnamn finns
    $('#popper_name').on('keyup', function(){
        var format = /^\s*$/;
        var popper_name = $(this).val();
            
        if(!format.test(popper_name)) {
            $('#popper_name').css('backgroundColor', '#1cc930');
            user_name = true;
            validate();
        }
        else {
            $('#popper_name').css('backgroundColor', '#f9f9f9');
            user_name = false;
            validate();
        }
    });
        
    // Validerar format för email
    $('#reg').on('keyup', function(){
        var format = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;
        var email = $(this).val();

        if(format.test(email)) {
            $('#reg').css('backgroundColor', '#1cc930');
            email_validation = true;
            validate();  
            $('#mail_info').hide(500)               
        }
        else {
            $('#reg').css('backgroundColor', '#f9f9f9');
            email_validation = false;  
            validate();
            $('#mail_info').show(500)
        }
    });

    // Validerar format för lösenord
    $('#pw_reg').on('keyup', function(){
        var format = /^(?=.*\d)(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])[0-9a-zA-ZåäöÅÄÖ]{8,}$/;
        var pw = $(this).val();

        if(format.test(pw)) {
            $('#pw_reg').css('backgroundColor', '#1cc930');
            password_validation = true;
            validate();
            $('#pw_info').hide(500)
        }
        else {
            $('#pw_reg').css('backgroundColor', '#f9f9f9');
            password_validation = false;
            validate();
            $('#pw_info').show(500)
        };
    });

    // Validerar användarnamn, epost-, lösenordformat är korrekt
    function validate(){
        if (email_validation == true && password_validation == true && user_name == true){
            $('#reg_submit').attr('disabled', false);
        }
        else {
            $('#reg_submit').attr('disabled', true);   
        }
    }

    // Visar och döljer lösenord för inloggning
    $('#showpwd').on('click', function() {
        
        if ($('#passw').attr('psswd-shown') == 'false') {
            
            $('#passw').removeAttr('type');
            $('#passw').attr('type', 'text');
            
            $('#passw').removeAttr('psswd-shown');
            $('#passw').attr('psswd-shown', 'true');
            
            $('#showpwd').attr('src','/static/IMG/hide.png');
            
        }else {
            
            $('#passw').removeAttr('type');
            $('#passw').attr('type', 'password');
            
            $('#passw').removeAttr('psswd-shown');
            $('#passw').attr('psswd-shown', 'false');
            
            $('#showpwd').attr('src','/static/IMG/eye.png');
            
        }
    });

    // Visar och döljer lösenord för registrering
    $('#showpw').on('click', function() {
        if('password' == $('#pw_reg').attr('type')){
            $('#pw_reg').prop('type', 'text');
            $('#showpw').attr('src','/static/IMG/hide.png');
        }
        else{
            $('#pw_reg').prop('type', 'password');
            $('#showpw').attr('src','/static/IMG/eye.png');
    }
    }); 

    //Visar och döljer alternativ för settings
    $('.setting_choice').on('click', function() {
        $(this).siblings('.settings_content').toggle();
    });

});