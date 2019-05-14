$(document).ready(() => {

    $('#new_pw').on('keyup', function(){
        var format = /^(?=.*\d)(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])[0-9a-zA-ZåäöÅÄÖ]{8,}$/;
        var pw = $(this).val();

        if(format.test(pw)) {
            $('#new_pw').css('backgroundColor', '#1cc930');
            $('#new_pw_submit').attr('disabled', false);
            $('#pw_info').hide(500)
        }
        else {
            $('#new_pw').css('backgroundColor', '#f9f9f9');
            $('#new_pw_submit').attr('disabled', true);
            $('#pw_info').show(500)
        };
    });

    $('#showpw').on('click', function() {
        if('password' == $('#new_pw').attr('type')){
            $('#new_pw').prop('type', 'text');
            $('#showpw').attr('src','/static/IMG/hide.png');
        }
        else{
            $('#new_pw').prop('type', 'password');
            $('#showpw').attr('src','/static/IMG/eye.png');
        }
    }); 
});