$(document).ready(() => {
var fullDate = new Date()
var currentDate = fullDate.toISOString().substr(0,10)

$('#new_task_enddate').attr("value", currentDate);

$('.plus').on('click', function(){
    $("#task_form").toggleClass('visible');
    $('.plus').toggleClass('rotate');
});
});