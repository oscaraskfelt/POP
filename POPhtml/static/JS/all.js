const AVAILABLE_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const localStorageName = 'calendar-events';

class CALENDAR {
    constructor(options) {
        this.options = options;
        this.elements = {
            days: this.getFirstElementInsideIdByClassName('calendar-days'),
            week: this.getFirstElementInsideIdByClassName('calendar-week'),
            month: this.getFirstElementInsideIdByClassName('calendar-month'),
            year: this.getFirstElementInsideIdByClassName('calendar-current-year'),
            eventList: this.getFirstElementInsideIdByClassName('current-day-events-list'),
            eventField: this.getFirstElementInsideIdByClassName('add-event-day-field'),
            eventAddBtn: this.getFirstElementInsideIdByClassName('add-event-day-field-btn'),
            currentDay: this.getFirstElementInsideIdByClassName('calendar-left-side-day'),
            currentWeekDay: this.getFirstElementInsideIdByClassName('calendar-left-side-day-of-week'),
            prevYear: this.getFirstElementInsideIdByClassName('calendar-change-year-slider-prev'),
            nextYear: this.getFirstElementInsideIdByClassName('calendar-change-year-slider-next')
        };

        this.eventList = tasks || {};
        this.date = +new Date();
        this.options.maxDays = 37;
        this.init();
    }

// App methods
    init() {
        if (!this.options.id) return false;
        this.eventsTrigger();
        this.drawAll();
    }

    // draw Methods
    drawAll() {
        this.drawWeekDays();
        this.drawMonths();
        this.drawDays();
        this.drawYearAndCurrentDay();
        this.drawEvents();

        showContent();
        edit_task()
    }

    drawEvents() {
        let calendar = this.getCalendar();
        let eventList = []
        let activeDay = calendar.active['day']
        if (activeDay < 10){
            activeDay = "0" + activeDay.toString()
        }
        else{
            activeDay.toString()
        }
        let activeMonth = calendar.active['month'] 
        let activeYear = (calendar.active['year']).toString()

        for (var prop in tasks){
            let day = tasks[prop][5].split(" ")[1]
            let month = tasks[prop][5].split(" ")[2]
            let year = tasks[prop][5].split(" ")[3]
            let title = tasks[prop][1]
            let content = tasks[prop][2]
            let taskId = tasks[prop][0]

            if (month == "Jan"){
                month = 0
            }
            else if (month == "Feb"){
                month = 1
            }
            else if (month == "Mar"){
                month = 2
            }
            else if (month == "Apr"){
                month = 3
            }
            else if (month == "May"){
                month = 4
            }
            else if (month == "Jun"){
                month = 5
            }
            else if (month == "Jul"){
                month = 6
            }
            else if (month == "Aug"){
                month = 7
            }
            else if (month == "Sep"){
                month = 8
            }
            else if (month == "Oct"){
                month = 9
            }
            else if (month == "Nov"){
                month = 10
            }
            else if (month == "Dec"){
                month = 11
            }
            
            if ( activeDay == day && activeMonth == month && year == activeYear){
            eventList.push([title, content, taskId])
            };

        
        };
        if (eventList === undefined || eventList.length == 0){
            eventList.push(["Du har inga tasks idag! Prokrastinera!"])
            let eventTemplate = "";
        eventList.forEach(item => {
            eventTemplate +=    `<li>
                                    <h4>${item}</h4>
                                </li>`;
            });
        this.elements.eventList.innerHTML = eventTemplate;
            }
        else{
        let eventTemplate = "";
        eventList.forEach(item => {
            eventTemplate +=    `<li>
                                    <h4 class="task_title">${item[0]}</h4>
                                    <div class="hide task_content">
                                        <p>${item[1]}</p>
                                        <button class="edit_butts buttwide butt" value="${item[2]}" name="id_task">Redigera task</button>
                                        <form id="remove_task_form" action="/poptask" method="POST">
                                            <input type="text" class="hide" value="${item[2]}" name="task_id" />
                                            <input class="buttwide butt" type="submit" value="Ta bort">
                                       </form>
                                    </div>
                                </li>`;
            });
        this.elements.eventList.innerHTML = eventTemplate;
        }
    }

    drawYearAndCurrentDay() {
        let calendar = this.getCalendar();
        this.elements.year.innerHTML = calendar.active.year;
        this.elements.currentDay.innerHTML = calendar.active.day;
        this.elements.currentWeekDay.innerHTML = AVAILABLE_WEEK_DAYS[calendar.active.week];
    }

    drawDays() {
        let calendar = this.getCalendar();

        let latestDaysInPrevMonth = this.range(calendar.active.startWeek).map((day, idx) => {
            return {
                dayNumber: this.countOfDaysInMonth(calendar.pMonth) - idx,
                month: new Date(calendar.pMonth).getMonth(),
                year: new Date(calendar.pMonth).getFullYear(),
                currentMonth: false
            }
        }).reverse();


        let daysInActiveMonth = this.range(calendar.active.days).map((day, idx) => {
            let dayNumber = idx + 1;
            let today = new Date();
            return {
                dayNumber,
                today: today.getDate() === dayNumber && today.getFullYear() === calendar.active.year && today.getMonth() === calendar.active.month,
                month: calendar.active.month,
                year: calendar.active.year,
                selected: calendar.active.day === dayNumber,
                currentMonth: true
            }
        });


        let countOfDays = this.options.maxDays - (latestDaysInPrevMonth.length + daysInActiveMonth.length);
        let daysInNextMonth = this.range(countOfDays).map((day, idx) => {
            return {
                dayNumber: idx + 1,
                month: new Date(calendar.nMonth).getMonth(),
                year: new Date(calendar.nMonth).getFullYear(),
                currentMonth: false
            }
        });

        let days = [...latestDaysInPrevMonth, ...daysInActiveMonth, ...daysInNextMonth];

        days = days.map(day => {
            let newDayParams = day;
            let formatted = new Date(`${Number(day.month) + 1}/${day.dayNumber}/${day.year}`).toLocaleDateString();
            let eventDates = this.eventList.map(event => new Date(event[5]).toLocaleDateString());
            newDayParams.hasEvent = eventDates.includes(formatted);
            return newDayParams;
        });

        let daysTemplate = "";
        days.forEach(day => {
            daysTemplate += `<li class="${day.currentMonth ? '' : 'another-month'}${day.today ? ' active-day ' : ''}${day.selected ? 'selected-day' : ''}${day.hasEvent ? ' event-day' : ''}" data-day="${day.dayNumber}" data-month="${day.month}" data-year="${day.year}"></li>`
        });

        this.elements.days.innerHTML = daysTemplate;
    }

    drawMonths() {
        let availableMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthTemplate = "";
        let calendar = this.getCalendar();
        availableMonths.forEach((month, idx) => {
            monthTemplate += `<li class="${idx === calendar.active.month ? 'active' : ''}" data-month="${idx}">${month}</li>`
        });

        this.elements.month.innerHTML = monthTemplate;
    }

    drawWeekDays() {
        let weekTemplate = "";
        AVAILABLE_WEEK_DAYS.forEach(week => {
            weekTemplate += `<li>${week.slice(0, 3)}</li>`
        });

        this.elements.week.innerHTML = weekTemplate;
    }

    // Service methods
    eventsTrigger() {
        this.elements.prevYear.addEventListener('click', e => {
            let calendar = this.getCalendar();
            this.updateTime(calendar.pYear);
            this.drawAll()
        });

        this.elements.nextYear.addEventListener('click', e => {
            let calendar = this.getCalendar();
            this.updateTime(calendar.nYear);
            this.drawAll()
        });

        this.elements.month.addEventListener('click', e => {
            let calendar = this.getCalendar();
            let month = e.srcElement.getAttribute('data-month');
            if (!month || calendar.active.month == month) return false;

            let newMonth = new Date(calendar.active.tm).setMonth(month);
            this.updateTime(newMonth);
            this.drawAll()
        });


        this.elements.days.addEventListener('click', e => {
            let element = e.srcElement;
            let day = element.getAttribute('data-day');
            let month = element.getAttribute('data-month');
            let year = element.getAttribute('data-year');
            if (!day) return false;
            let strDate = `${Number(month) + 1}/${day}/${year}`;
            this.updateTime(strDate);
            this.drawAll()
        });


        this.elements.eventAddBtn.addEventListener('click', e => {
            let fieldValue = this.elements.eventField.value;
            if (!fieldValue) return false;
            let dateFormatted = this.getFormattedDate(new Date(this.date));
            if (!this.eventList[dateFormatted]) this.eventList[dateFormatted] = [];
            this.eventList[dateFormatted].push(fieldValue);
            localStorage.setItem(localStorageName, JSON.stringify(this.eventList));
            this.elements.eventField.value = '';
            this.drawAll()
        });


    }


    updateTime(time) {
        this.date = +new Date(time);
    }

    getCalendar() {
        let time = new Date(this.date);

        return {
            active: {
                days: this.countOfDaysInMonth(time),
                startWeek: this.getStartedDayOfWeekByTime(time),
                day: time.getDate(),
                week: time.getDay(),
                month: time.getMonth(),
                year: time.getFullYear(),
                formatted: this.getFormattedDate(time),
                tm: +time
            },
            pMonth: new Date(time.getFullYear(), time.getMonth() - 1, 1),
            nMonth: new Date(time.getFullYear(), time.getMonth() + 1, 1),
            pYear: new Date(new Date(time).getFullYear() - 1, 0, 1),
            nYear: new Date(new Date(time).getFullYear() + 1, 0, 1)
        }
    }

    countOfDaysInMonth(time) {
        let date = this.getMonthAndYear(time);
        return new Date(date.year, date.month + 1, 0).getDate();
    }

    getStartedDayOfWeekByTime(time) {
        let date = this.getMonthAndYear(time);
        return new Date(date.year, date.month, 1).getDay();
    }

    getMonthAndYear(time) {
        let date = new Date(time);
        return {
            year: date.getFullYear(),
            month: date.getMonth()
        }
    }

    getFormattedDate(date) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    range(number) {
        return new Array(number).fill().map((e, i) => i);
    }

    getFirstElementInsideIdByClassName(className) {
        return document.getElementById(this.options.id).getElementsByClassName(className)[0];
    }
}


(function () {
    new CALENDAR({
        id: "calendar"
    })
})();

function showContent() {
    $('.task_title').on('click', function(){
    $(this).siblings('.task_content').toggleClass('hide');
}); 
}

function edit_task() {
    $(".edit_butts").on('click', function() {
        $("#edit_form").toggleClass('visible');
        $('.edit_plus').toggleClass('rotate');
        var fired_button = $(this).val();
        console.log("fired butt", fired_button)
    
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
                console.log("blää")
            }
        }
    });
}