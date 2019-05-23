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
        var id = this.id;


        if (id == "tasks_dead"){
            for (var prop in tasks_dead){
                if (tasks_dead[prop][6] == task_id){
                    document.getElementById("show_form").innerHTML = `<img class="inside_plus edit_plus show_form_plus" src="/static/IMG/plus_exit.png" alt="plus">
                                                                        <h3>${tasks_dead[prop][0]}</h3>
                                                                        <p>${tasks_dead[prop][2]}</p>
                                                                        <button class="edit_butt buttwide butt" id="show_edit" value="${tasks_dead[prop][6]}" name="id_task">Redigera task</button>`
                };
            };
            console.log(task_id)
            $(".show_form_plus").toggleClass('rotate');
            $(".show_form_plus").on("click", function() {
                $("#show_form").toggleClass('visible');
            });

            $("#show_edit").on('click', function() {
                $("#show_form").toggleClass('visible');
                $("#edit_form").toggleClass('visible');
                $('.edit_plus').toggleClass('rotate');
                var fired_button = task_id;
                console.log(fired_button)
            
                for (var prop in tasks_dead){
                    if (tasks_dead[prop][6] == fired_button){
                        $('#edit_task_header').val(tasks_dead[prop][0]);
                        $('#edit_task_content').val(tasks_dead[prop][2]);
            
                        prio = tasks_dead[prop][1];
                        ($(`#edit_task_prio option[value=${prio}]`).attr("selected", true));
            
                        date = new Date(tasks_dead[prop][4]).getDate();
                        month = new Date(tasks_dead[prop][4]).getMonth()+1;
                        year = new Date(tasks_dead[prop][4]).getFullYear();
                    
                        if (date<10){
                            date = '0' + date;
                        }
            
                        if (month<10){
                            month = '0' + month;
                        }
            
                        fulldate = year + '-' + month + '-' + date;
                
                        $('#edit_task_enddate').val(fulldate);
                        $('#task_id').val(fired_button);
                    }
                }
                
                let title = true;
                let content = true;
                let enddate = true;
                
                $('#edit_task_header').on('keyup', function(){
                    var format = /^\s*$/;
                    var task_content = $(this).val();
                        
                    if(!format.test(task_content)) {
                        $('#edit_task_header').css('backgroundColor', '#85cc9f88');
                        title = true;
                        validate()
                    }
                    else {
                        $('#edit_task_header').css('backgroundColor', '#e8464618');
                        title = false;
                        validate()
                    }
                });
                
                $('#edit_task_content').on('keyup', function(){
                    var format = /^\s*$/;
                    var task_content = $(this).val();
                        
                    if(!format.test(task_content)) {
                        $('#edit_task_content').css('backgroundColor', '#85cc9f88');
                        content = true;
                        validate()
                    }
                    else {
                        $('#edit_task_content').css('backgroundColor', '#e8464618');
                        content = false;
                        validate()
                    }
                });
                
                $('#edit_task_enddate').on('change', function(){
                    var task_enddate = $(this).val();
                
                    if (task_enddate.split("-")[0] >= "2000") {
                        $('#edit_task_enddate').css('backgroundColor', '#85cc9f88');     
                        enddate = true;       
                        validate()
                    }
                    else {
                        $('#edit_task_enddate').css('backgroundColor', '#e8464618');
                        enddate = false;
                        validate()
                    }
                });
        
                function validate() {
                    if(title === true && content === true && enddate === true){
                        $('.task_butt').attr('disabled', false);
                    }
                    else {
                        $('.task_butt').attr('disabled', true);
                    }
                }  
            });
        }else if (id == "tasks_data"){
            for (var prop in data){
            if (data[prop][0] == task_id){
                    document.getElementById("show_form").innerHTML = `<img class="inside_plus edit_plus show_form_plus" src="/static/IMG/plus_exit.png" alt="plus">
                                                                        <h3>${data[prop][1]}</h3>
                                                                        <p>${data[prop][2]}</p>
                                                                        <button class="edit_butt buttwide butt" id="show_edit" value="${data[prop][0]}" name="id_task">Redigera task</button>`
                };
            };
            $(".show_form_plus").toggleClass('rotate');
            $(".show_form_plus").on("click", function() {
                $("#show_form").toggleClass('visible');
            });

            $("#show_edit").on('click', function() {
                $("#show_form").toggleClass('visible');
                $("#edit_form").toggleClass('visible');
                $('.edit_plus').toggleClass('rotate');
                var fired_button = task_id;
            
                for (var prop in data){
                    if (data[prop][0] == fired_button){
                        $('#edit_task_header').val(data[prop][1]);
                        $('#edit_task_content').val(data[prop][2]);
            
                        prio = data[prop][3];
                        ($(`#edit_task_prio option[value=${prio}]`).attr("selected", true));
            
                        date = new Date(data[prop][5]).getDate();
                        month = new Date(data[prop][5]).getMonth()+1;
                        year = new Date(data[prop][5]).getFullYear();
                    
                        if (date<10){
                            date = '0' + date;
                        }
            
                        if (month<10){
                            month = '0' + month;
                        }
            
                        fulldate = year + '-' + month + '-' + date;
                
                        $('#edit_task_enddate').val(fulldate);
                        $('#task_id').val(fired_button);
                    }
                }
                
                let title = true;
                let content = true;
                let enddate = true;
                
                $('#edit_task_header').on('keyup', function(){
                    var format = /^\s*$/;
                    var task_content = $(this).val();
                        
                    if(!format.test(task_content)) {
                        $('#edit_task_header').css('backgroundColor', '#85cc9f88');
                        title = true;
                        validate()
                    }
                    else {
                        $('#edit_task_header').css('backgroundColor', '#e8464618');
                        title = false;
                        validate()
                    }
                });
                
                $('#edit_task_content').on('keyup', function(){
                    var format = /^\s*$/;
                    var task_content = $(this).val();
                        
                    if(!format.test(task_content)) {
                        $('#edit_task_content').css('backgroundColor', '#85cc9f88');
                        content = true;
                        validate()
                    }
                    else {
                        $('#edit_task_content').css('backgroundColor', '#e8464618');
                        content = false;
                        validate()
                    }
                });
                
                $('#edit_task_enddate').on('change', function(){
                    var task_enddate = $(this).val();
                
                    if (task_enddate.split("-")[0] >= "2000") {
                        $('#edit_task_enddate').css('backgroundColor', '#85cc9f88');     
                        enddate = true;       
                        validate()
                    }
                    else {
                        $('#edit_task_enddate').css('backgroundColor', '#e8464618');
                        enddate = false;
                        validate()
                    }
                });
        
                function validate() {
                    if(title === true && content === true && enddate === true){
                        $('.task_butt').attr('disabled', false);
                    }
                    else {
                        $('.task_butt').attr('disabled', true);
                    }
                }  
            });
        };
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