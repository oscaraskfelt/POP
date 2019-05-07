$(function(){
    $("a").each(function(){
            if ($(this).attr("href").split("/")[1] == window.location.pathname.split("/")[1]){
                    $(this).css('fontWeight', 'bold');
            }
    });
});