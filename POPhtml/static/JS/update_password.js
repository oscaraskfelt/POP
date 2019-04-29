$(document).ready(() => {

    $('#new_pw').on('keyup', function(){
        var format = /^(?=.*\d)(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])[0-9a-zA-ZåäöÅÄÖ]{8,}$/;
        var pw = $(this).val();

        if(format.test(pw)) {
            $('#new_pw').css('backgroundColor', '#1cc930');
            $('#new_pw_submit').attr('disabled', false);
        }
        else {
            $('#new_pw').css('backgroundColor', '#f9f9f9');
            $('#new_pw_submit').attr('disabled', true);
        };
    });
});