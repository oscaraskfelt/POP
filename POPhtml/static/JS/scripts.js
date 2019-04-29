    $(document).ready(() => {
    email_validation = false;
    password_validation = false;
    user_name = false;


    $('#login_butt').on('click', function(){
        $("#login_form").toggleClass('hide block');
        $("#reg_form").addClass('hide');
        $("#reg_form").removeClass('block');
    });


    $('#register_butt').on('click', function(){
        $("#reg_form").toggleClass('hide block');
        $("#login_form").addClass('hide');
        $("#login_form").removeClass('block');
    });


    $('#reg').on('keyup', function(){
        var format = /^([a-zA-ZåäöÅÄÖ0-9_\.\-\+])+\@(([a-zA-ZåäöÅÄÖ0-9\-])+\.)+([a-zA-ZåäöÅÄÖ0-9]{2,4})/;
        var email = $(this).val();

        if(format.test(email)) {
            $('#reg').css('backgroundColor', '#1cc930');
            email_validation = true;
            validate();                 
        }
        else {
            $('#reg').css('backgroundColor', '#f9f9f9');
            email_validation = false;  
            validate();
        }
    });


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


    $('#pw_reg').on('keyup', function(){
        var format = /^(?=.*\d)(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])[0-9a-zA-ZåäöÅÄÖ]{8,}$/;
        var pw = $(this).val();

        if(format.test(pw)) {
            $('#pw_reg').css('backgroundColor', '#1cc930');
            password_validation = true;
            validate();
        }
        else {
            $('#pw_reg').css('backgroundColor', '#f9f9f9');
            password_validation = false;
            validate();
        };
    });
});


function validate(){
    if (email_validation == true && password_validation == true && user_name == true){
        $('#reg_submit').attr('disabled', false);
    }
    else {
        $('#reg_submit').attr('disabled', true);   
    }
}
