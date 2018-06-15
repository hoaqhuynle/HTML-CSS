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

var textBoxUsername = document.getElementById("username");
var textBoxPassword = document.getElementById("password");
var textBoxEmail = document.getElementById("email");

var buttonSubmit = document.getElementById("submit");
var buttonRefresh = document.getElementById("refresh");

var message = document.getElementById("message");

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

buttonSubmit.addEventListener("click", function () {
    if (!isValidated()) {
        validateUsername();
        validatePassword();
        validateEmail();

        message.innerHTML = "";
    } else {
        document.getElementById("err-username").innerHTML = "";
        document.getElementById("err-password").innerHTML = "";
        document.getElementById("err-email").innerHTML = "";
        insertData();
    }
});

buttonRefresh.addEventListener("click", function () {
    textBoxEmail.value = "";
    textBoxPassword.value = "";
    textBoxUsername.value = "";

    document.getElementById("err-username").innerHTML = "";
    document.getElementById("err-password").innerHTML = "";
    document.getElementById("err-email").innerHTML = "";

    init();
    selectDateOnCalendar();

    calendar.style.display = "none";
    controller.style.display = "none";

    message.innerHTML = "";
})

/*----------------------------------------------------------------------------*/

function insertData() {
    var username = textBoxUsername.value;
    var password = textBoxPassword.value;
    var email = textBoxEmail.value;

    if (username.length == 0 || password.length == 0 || email.length == 0) {
        message.innerHTML = "";
        return;
    }
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            message.innerHTML = this.responseText;
        }
    };
    var dob = dateText.value;

    var dobStrings = dob.split("/");
    var dob = dobStrings[1] + "/" + dobStrings[2] + "/" + dobStrings[0];

    xhttp.open("GET", "./script/insert-data.php?username=" + username + "&password=" + password + "&email=" + email + "&dob=" + dob, true);
    xhttp.send();
}

function isValidated() {
    return validatedUsername() && validatedPassword() && validatedEmail();
}

function validatedPassword() {
    var ok = true;

    if (isEmptyTextBox(textBoxPassword)) {
        ok = false;
    } else if (!isEmptyTextBox(textBoxPassword) && isLess8Character(textBoxPassword)) {
        ok = false;
    } else if (!isLess8Character(textBoxPassword) && isWrongUsernameFormat(textBoxPassword)) {
        ok = false;
    } else if (!isWrongUsernameFormat(textBoxPassword)) {
        ok = true;
    }
    return ok;
}

function validatedEmail() {
    var ok = true;

    if (isEmptyTextBox(textBoxEmail)) {
        ok = false;
    } else if (!isEmptyTextBox(textBoxEmail) && isWrongEmailFormat(textBoxEmail)) {
        ok = false;
    } else if (!isWrongEmailFormat(textBoxEmail)) {
        ok = true;
    }
    return ok;
}

function validatedUsername() {
    var ok = true;

    if (isEmptyTextBox(textBoxUsername)) {
        ok = false;
    } else if (!isEmptyTextBox(textBoxUsername) && isLess8Character(textBoxUsername)) {
        ok = false;
    } else if (!isLess8Character(textBoxUsername) && isWrongUsernameFormat(textBoxUsername)) {
        ok = false;
    } else if (!isWrongUsernameFormat(textBoxUsername)) {
        ok = true;
    }
    return ok;
}

/**
 * Validate email
 */
function validateEmail() {
    var err = "";
    var p = document.getElementById("err-email");
    var ok = true;

    if (isEmptyTextBox(textBoxEmail)) {
        err = "Email is required.";
        ok = false;
    } else if (!isEmptyTextBox(textBoxEmail) && isWrongEmailFormat(textBoxEmail)) {
        err = "Email is wrong format";
        ok = false;
    } else if (!isWrongEmailFormat(textBoxEmail)) {
        p.style.display = "none";
        ok = true;
    }

    if (!ok) {
        p.innerHTML = err;
        p.style.display = "inline";
    }
    return ok;
}

/**
 * Check email if it is wrong format
 * @param {HTMLElement} textbox input type = text
 */
function isWrongEmailFormat(textbox) {
    var emailRegex = /^[a-zA-Z0-9\.]+[@]{1}[a-z0-9]+[.]{1}[a-z]+$/;
    if (!emailRegex.test(textbox.value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Validate password.
 */
function validatePassword() {
    var err = "";
    var p = document.getElementById("err-password");
    var ok = true;

    if (isEmptyTextBox(textBoxPassword)) {
        err = "Password is required.";
        ok = false;
    } else if (!isEmptyTextBox(textBoxPassword) && isLess8Character(textBoxPassword)) {
        err = "Password is more than 8 characters.";
        ok = false;
    } else if (!isLess8Character(textBoxPassword) && isWrongUsernameFormat(textBoxPassword)) {
        err = "Password just unclude letter, number";
        ok = false;
    } else if (!isWrongUsernameFormat(textBoxPassword)) {
        p.style.display = "none";
        ok = true;
    }

    if (!ok) {
        p.innerHTML = err;
        p.style.display = "inline";
    }
    return ok;
}

/**
 * Validate username.
 */
function validateUsername() {
    var err = "";
    var p = document.getElementById("err-username");
    var ok = true;

    if (isEmptyTextBox(textBoxUsername)) {
        err = "Username is required.";
        ok = false;
    } else if (!isEmptyTextBox(textBoxUsername) && isLess8Character(textBoxUsername)) {
        err = "Username is more than 8 characters.";
        ok = false;
    } else if (!isLess8Character(textBoxUsername) && isWrongUsernameFormat(textBoxUsername)) {
        err = "Username just unclude letter, number";
        ok = false;
    } else if (!isWrongUsernameFormat(textBoxUsername)) {
        p.style.display = "none";
        ok = true;
    }

    if (!ok) {
        p.innerHTML = err;
        p.style.display = "inline";
    }
    return ok;
}

/**
 * 
 * @param {HTMLElement} textbox input type = text.
 */
function isWrongUsernameFormat(textbox) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(textbox.value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check textbox if value of it less than 8.
 * @param {HTMLElement} textBox input type=text
 */
function isLess8Character(textBox) {
    if (textBox.value.length < 8) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check text box if it is empty
 * @param {HTMLElement} textBox Input type="text"
 * @returns true if texbox is empty.
 * @returns false if textbox is not empty.
 */
function isEmptyTextBox(textBox) {
    if (textBox.value == "") {
        return true;
    } else {
        return false;
    }
}

/**
 * Reselect date
 */
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

            if (parseInt(month) > currentDate.getMonth() && parseInt(year) == currentDate.getFullYear()) {
                alert("This day is greater than today");
            } else if (parseInt(month) == currentDate.getMonth() && parseInt(this.innerHTML) > currentDate.getDate() && parseInt(year) == currentDate.getFullYear()) {
                alert("This day is greater than today");
            } else {
                changeDateText(year, month, this.innerHTML);
                // alert("This day is greater than today");
            }

            // changeDateText(year, month, this.innerHTML);

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
    selectDateOnCalendar();
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
        calendar.style.display = "initial";
        controller.style.display = "initial";
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
    } else if (calendar.style.display === "initial") {
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
