$('.edit_plus').on('click', function(){
    $('#edit_form').toggleClass('visible');
    $('.edit_plus').toggleClass('rotate');
    $('#edit_task_header').css('backgroundColor', 'rgb(231, 231, 231)');
    $('#edit_task_content').css('backgroundColor', 'rgb(231, 231, 231)');
    $('#edit_task_enddate').css('backgroundColor', 'rgb(231, 231, 231)')
});

edit_task()

function edit_task() {
    $(".edit_butt").on('click', function() {
        $("#edit_form").toggleClass('visible');
        $('.edit_plus').toggleClass('rotate');
        var fired_button = $(this).val();
    
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
        }; 
    });
}