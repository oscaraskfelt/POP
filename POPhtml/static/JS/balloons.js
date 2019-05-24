$(".ta_bort").click(function() {
    $(this).parents("form").parents("div").siblings("#poppin").animate({left: '115%'});
    $(this).parents("form").parents("div").siblings(".btn").hide();
    $(this).parents("form").parents("div").siblings("#popcircle").hide("explode", {
        pieces: 50
    }, 250);
  });

$(".ta_bort").hover(function() {
    $(this).parents("form").parents("div").siblings("#poppin").animate({left: '123%', opacity: '1',});
  });

$(".ta_bort").mouseout(function() {
    $(this).parents("form").parents("div").siblings("#poppin").animate({left: '140%', opacity: '0',});
  });
