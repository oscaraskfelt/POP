$('.plus').on('click', function(){
    $("#task_form").toggleClass('visible');
    $('.plus').toggleClass('rotate');
});

var fullDate = new Date()
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
var twoDigitDay = ((fullDate.getDay().length))? (fullDate.getDay()) : '0' + (fullDate.getDay());
var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDay;

$('#new_task_enddate').attr("value", currentDate);
