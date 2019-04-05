var first = document.getElementById("first")
var second = document.getElementById("second")
var info = document.getElementsByClassName("info")

$(function(){
    $(info).hide();
});

$(function(){
    $('.forward').on('click', function(){
        var item = $(this).attr('data-act');
        $(second).append($('#'+item));

    });
});
$(function(){
    $('.backward').on('click', function(){
        var item = $(this).attr('data-act');
        $(first).append($('#'+item));

    });
});

$(function(){
    $('.task').on('click', function(){
        var item = $(this).attr('data-act');
        var item = "#" + item
        $(item).find('.info').toggle();
    });
});


/*
function add_task(){
    var task_head = $('#new-task-header').val();
    var task_content = $('#new-task-content').val();
    $('#first').append(
        "<div class=\"board-item\">" + 
            "<button class=\"backward\"><<<</button>" + 
            "<div class=\"task\">" + task_head + "</div>" +
            "<button class=\"forward\" >>>></button>" +
            "<div class=\"info\">"+
                task_content +
            "</div>"+
        "</div>"
        );
        console.log(task_head, task_content);
        $('#new-task-header').val("");
        $('#new-task-content').val("");
    };

$(function(){
    $('#add-task-item').on('click', function(e){
        e.preventDefault();  
        add_task()  
    });
});
*/