$(document).ready(() => {
    var fullDate = new Date()
    var currentDate = fullDate.toISOString().substr(0,10)

    $('#new_task_enddate').attr("value", currentDate);

    $('.plus').on('click', function(){
        $("#task_form").toggleClass('visible');
        $('.plus').toggleClass('rotate');
    });

    /* Pop-up för redigering av task */
    $('.edit_butt').on('click', function() {
        $("#edit_form").toggleClass('visible');
        $('.edit_plus').toggleClass('rotate');
    });

    $('.edit_plus').on('click', function(){
        $('#edit_form').toggleClass('visible');
        $('.edit_plus').toggleClass('rotate');
    });

    var task1 = 0
    for (i in tasks){
        task1 = task1 + 1
    }

    var task2 = 0
    for (i in data){
        task2 = task2 + 1
    }

    var totalt = task1 + task2

    document.getElementById("deadli").innerHTML = "Deadlines (" + totalt + ")";

    $(".deadline_list_l").click(function(){
        var task_id = $(this).val();
        $("#show_form").toggleClass('visible');

        for (var prop in tasks){
            if (tasks[prop][6] == task_id){
                document.getElementById("show_form").innerHTML = `<h3>${tasks[prop][0]}</h3>
                                                                    <p>${tasks[prop][2]}</p>`
            }
        }

        for (var prop in data){
            if (data[prop][0] == task_id){
                document.getElementById("show_form").innerHTML = `<h3>${data[prop][1]}</h3>
                                                                    <p>${data[prop][2]}</p>`
            }
        }


    })

});