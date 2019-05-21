$(document).ready(() => {
    var fullDate = new Date()
    var currentDate = fullDate.toISOString().substr(0,10)

    $('#new_task_enddate').attr("value", currentDate);

    $('.plus').on('click', function(){
        $("#task_form").toggleClass('visible');
        $('.plus').toggleClass('rotate');
    });

    if (typeof tasks_dead === 'object'){
    var task1 = 0
    for (i in tasks_dead){
        task1 = task1 + 1
    }

    var task2 = 0
    for (i in data){
        task2 = task2 + 1
    }

        var task2 = 0
        for (i in data){
            task2 = task2 + 1
        }

        var totalt = task1 + task2
        document.getElementById("deadli").innerHTML = "Deadlines (" + totalt + ")";
    };

    $(".deadline_list_l").click(function(){
        var task_id = $(this).val();
        $("#show_form").toggleClass('visible');

        for (var prop in tasks_dead){
            if (tasks_dead[prop][6] == task_id){
                document.getElementById("show_form").innerHTML = `<h3>${tasks_dead[prop][0]}</h3>
                                                                    <p>${tasks_dead[prop][2]}</p>`
            }
        }

        for (var prop in data){
            if (data[prop][0] == task_id){
                document.getElementById("show_form").innerHTML = `<h3>${data[prop][1]}</h3>
                                                                    <p>${data[prop][2]}</p>`
            }
        }
    });

    let title = false;
    let content = false;
    let date = true;

    $('#new_task_header').on('keyup', function(){
        var format = /^\s*$/;
        var task_name = $(this).val();
            
        if(!format.test(task_name)) {
            $('#new_task_header').css('backgroundColor', '#85cc9f88');
            title = true;
            validate()
        }
        else {
            $('#new_task_header').css('backgroundColor', '#e8464618');
            title = false;
            validate()
        }
    });

    $('#new_task_content').on('keyup', function(){
        var format = /^\s*$/;
        var task_content = $(this).val();
            
        if(!format.test(task_content)) {
            $('#new_task_content').css('backgroundColor', '#85cc9f88');
            content = true;
            validate()
        }
        else {
            $('#new_task_content').css('backgroundColor', '#e8464618');
            content = false;
            validate()
        }
    });

    $('#new_task_enddate').on('change', function(){
        var task_enddate = $(this).val();

        if (task_enddate.split("-")[0] >= "2000") {
            $('#new_task_enddate').css('backgroundColor', '#85cc9f88');
            date = true;
            validate()
        }
        else {
            $('#new_task_enddate').css('backgroundColor', '#e8464618');   
            date = false;
            validate()
        }
    });

    function validate() {
        if(title === true && content === true && date === true){
            $('.task_butt').attr('disabled', false);
        }
        else {
            $('.task_butt').attr('disabled', true);
        }
    };
});