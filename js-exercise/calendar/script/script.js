var calendar = document.getElementById("calendar");
var controller = document.getElementById("controller");
var calendarButton = document.getElementById("calendar-button");
var comboboxMonth = document.getElementById("months");
var comboBoxYear = document.getElementById("years");
var dateText = document.getElementById("date-text");
var buttonPreviousYear = document.getElementById("previous-year");
var buttonPreviousMonth = document.getElementById("previous-month");
var buttonNextMonth = document.getElementById("next-month");
var buttonNextYear = document.getElementById("next-year");

var currentDate = new Date();

init();

calendarButton.addEventListener("click", function () {
    var dateString = dateText.value.split("/");
    var year = parseInt(dateString[0]);
    var month = parseInt(dateString[1]) - 1;
    var date = parseInt(dateString[2]);
    
    changeDate(year, month, date);
    selectDateOnCalendar();
    
    comboBoxYear.value = year;
    comboboxMonth.value = month;
    
    showOrHideCalendar();
});

var aList = calendar.getElementsByTagName("a");

for (var i = 0; i < aList.length; i++) {
    aList[i].addEventListener("click", function () {
        deleteOldIndex();
        this.style.color = "#e74c3c";

        var year = comboBoxYear.value;
        var month = comboboxMonth.value;

        changeDateText(year, month, this.innerHTML);
        
        showOrHideCalendar();
    });
}

comboBoxYear.addEventListener("change", function () {
    changeByYear();
    reSelectCurrentSelectedDate();
});

comboboxMonth.addEventListener("change", function () {
    var year = comboBoxYear.value;
    var month = comboboxMonth.value;
    
    changeMonth(year, month);
    
    reSelectCurrentSelectedDate();

    var aList = calendar.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        aList[i].addEventListener("click", function () {
            deleteOldIndex();
            this.style.color = "#e74c3c";
        });
    }
    selectDateOnCalendar();
});

buttonPreviousYear.addEventListener("click", function () {
    var yearValue = comboBoxYear.value - 1;
    if (yearValue < 1970) {
        yearValue = currentDate.getFullYear();
    }
    comboBoxYear.value = yearValue;
    changeByYear();
    
    reSelectCurrentSelectedDate();
});

buttonPreviousMonth.addEventListener("click", function () {
    var monthValue = parseInt(comboboxMonth.value) - 1;
    if (monthValue < 0) {
        monthValue = 11;
    }
    comboboxMonth.value = monthValue;   
    changeByYear();
    
    reSelectCurrentSelectedDate();
});

buttonNextMonth.addEventListener("click", function () {
    var monthValue = parseInt(comboboxMonth.value) + 1;
    if (monthValue > 11) {
        monthValue = 0;
    }
    comboboxMonth.value = monthValue;
    changeByYear();
    
    reSelectCurrentSelectedDate();
});

buttonNextYear.addEventListener("click", function () {
    var yearValue = parseInt(comboBoxYear.value) + 1;
    if (yearValue > currentDate.getFullYear()) {
        yearValue = 1970;
    }
    comboBoxYear.value = yearValue;
    changeByYear();
    
    reSelectCurrentSelectedDate();
});

/*----------------------------------------------------------------------------*/

function reSelectCurrentSelectedDate() {
    var dates = dateText.value.split("/");
    
    var year = parseInt(dates[0]);
    var month = parseInt(dates[1]) - 1;
    var date = parseInt(dates[2]);
    
    var currentSelectedYear = parseInt(comboBoxYear.value);
    var currentSelectedMonth = parseInt(comboboxMonth.value);
    
    if (year == currentSelectedYear && month == currentSelectedMonth) {
        selectDate(date);
    }
}

/**
 * All changing thing by year.
 */
function changeByYear() {
    var year = comboBoxYear.value;
    var month = comboboxMonth.value;
    
    changeMonth(year, month);

    var aList = calendar.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        aList[i].addEventListener("click", function () {
            deleteOldIndex();
            this.style.color = "#e74c3c";
        });
    }

    selectDateOnCalendar();
}

/**
 * When click on a day on calendar, color of this day will change to red and 
 * date text of text box also change.
 */
function selectDateOnCalendar() {
    var aList = calendar.getElementsByTagName("a");

    for (var i = 0; i < aList.length; i++) {
        aList[i].addEventListener("click", function () {
            deleteOldIndex();
            this.style.color = "#e74c3c";

            var year = comboBoxYear.value;
            var month = comboboxMonth.value;

            changeDateText(year, month, this.innerHTML);
            
            showOrHideCalendar();
        });
    }
}

/**
 * Delete selected date color when click on another date
 */
function deleteOldIndex() {
    var calendar = document.getElementById("calendar");
    var aList = calendar.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        aList[i].style.color = "#2980b9";
    }
}

function changeMonth(year, month) {
    createNewCalendar(year, month);
}

/**
 * Change date on dalendar
 * @param {number} year Year
 * @param {number} month Month
 * @param {number} date Date
 */
function changeDate(year, month, date) {
    createNewCalendar(year, month);
    selectDate(date);
}

/**
 * If the date is selected, it will have red color
 * @param {number} date Date
 */
function selectDate(date) {
    var aList = calendar.getElementsByTagName("a");

    for (var i = 0; i < aList.length; i++) {
        if (aList[i].innerHTML == date) {
            aList[i].style.color = "#e74c3c";
        }
    }
}

/**
 * Remove old calendar and create new calendar
 * @param {number} year Year
 * @param {number} month Month
 */
function createNewCalendar(year, month) {
    while (calendar.childElementCount > 1) {
        calendar.removeChild(calendar.lastChild);
    }
    createCalendar(year, month);
}

/**
 * Initial UI
 */
function init() {
    initComboboxYear();
    initComboboxMonth();
    initCalendar();
    initDateText();
}

/**
 * Initial date text
 */
function initDateText() {
    var month = currentDate.getMonth();
    changeDateText(currentDate.getFullYear(), month, currentDate.getDate());
}

function changeDateText(year, month, date) {
    dateText.value = year + "/" + (parseInt(month) + 1) + "/" + date;
}

/**
 * Initial the calendar
 */
function initCalendar() {
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    selectDate(currentDate.getDate());
}

/**
 * Initial year combobox
 */
function initComboboxYear() {
    var currentYear = currentDate.getFullYear();

    for (year = 1970; year < currentYear + 1; year++) {
        var option = document.createElement("option");
        option.value = year;
        comboBoxYear.appendChild(option);

        var yearText = document.createTextNode(year);
        option.appendChild(yearText);

        if (year === currentYear) {
            option.selected = true;
        }
    }
}

/**
 * Initial month combobox
 */
function initComboboxMonth() {
    var currentMonth = currentDate.getMonth();

    var comboboxMonth = document.getElementById("months");
    var months = comboboxMonth.children;

    for (index = 0; index < 12; index++) {
        if (months[index].value == currentMonth) {
            months[index].selected = true;
        }
    }
}

/**
 * If calendar was showed, hide it
 * Else, calendar will be showed
 */
function showOrHideCalendar() {
    if (!isCalendarShowed()) {
        calendar.style.display = "inline-block";
        controller.style.display = "inline-block";
    } else {
        calendar.style.display = "none";
        controller.style.display = "none";
    }
}

/**
 * Check calendar showed or hided.
 * @returns true if calendar is showed.
 * @returns false if calendar is hided.
 */
function isCalendarShowed() {
    if (calendar.style.display === "none") {
        return false;
    } else if (calendar.style.display === "inline-block") {
        return true;
    }
}

/**
 * Create content of calendar
 * @param {number} year Year
 * @param {number} month Month
 */
function createCalendar(year, month) {
    var date = new Date(year, month, 1);
    var daysOfMonth = getDaysOfMonth(year, month);
    var dayOfWeek = 0;
    var lastTr = calendar.lastChild;

    for (var dateIndex = 0 - date.getDay(); dateIndex < daysOfMonth; dateIndex++) {
        if (dayOfWeek === 0) {
            var tr = document.createElement("tr");
            calendar.appendChild(tr);

            lastTr = calendar.lastChild;
        }
        var td = document.createElement("td");
        lastTr.appendChild(td);

        var a = document.createElement("a");
        a.href = "#";
        a.style.textDecoration = "none";
        a.style.color = "#2980b9";
        td.appendChild(a);

        if (dateIndex >= 0) {
            var text = document.createTextNode((dateIndex + 1).toString());
            a.appendChild(text);
        } else {
            var text = document.createTextNode("");
            a.appendChild(text);
        }
        dayOfWeek++;
        if (dayOfWeek > 6) {
            dayOfWeek = 0;
        }
    }
}

/**
 * Get number day of month
 * @param {number} year Year
 * @param {number} month Month
 */
function getDaysOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}