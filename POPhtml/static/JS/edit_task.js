$(".edit_butt").click(function() {
    var fired_button = $(this).val();
    console.log(fired_button)

    for (var prop in tasks){
        if (tasks[prop][0] == fired_button){
            $('#edit_task_header').val(tasks[prop][1]);
            $('#edit_task_content').val(tasks[prop][2]);

            prio = tasks[prop][3];
            ($(`#edit_task_prio option[value=${prio}]`).attr("selected", true));

            date = new Date(tasks[prop][5]).getDate();
            month = new Date(tasks[prop][5]).getMonth()+1;
            year = new Date(tasks[prop][5]).getFullYear();

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
});