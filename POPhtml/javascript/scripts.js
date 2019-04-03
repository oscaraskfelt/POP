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

/*
$(function() {     
        $(".butt").on('click', function(){
            $(login).slideToggle(200);        
    });
$(function() {     
    $(".butt1").on('click', function(){
        $(reg).slideToggle(200);        
    });
});

});
*/