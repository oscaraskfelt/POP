$(".ta_bort").click(function() {
    $(this).parents("form").parents("div").siblings(".btn").hide();
    $(this).parents("form").parents("div").siblings("#popcircle").hide("explode", {
        pieces: 50
    }, 250);
  });
