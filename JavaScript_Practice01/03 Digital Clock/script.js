const hourEl = document.querySelector(".hour");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const periodEl = document.querySelector(".period");

const monthsEl = document.querySelector(".month-name");
const daysEl = document.querySelector(".day-name");
const dayNumberEl = document.querySelector(".day-number");
const yearEl = document.querySelector(".year");

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const clock = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const month = today.getMonth();

    hourEl.innerHTML = addZero(period(hour));
    minutesEl.innerHTML = addZero(minutes);
    secondsEl.innerHTML = addZero(seconds);
    periodEl.innerHTML = setTimePeriod(hour);
}
clock();

function setTimePeriod(time) {
    let ampm = "";
    if (time < 12) {
        ampm = "AM";
    } else {
        ampm = "PM";
    }
    return ampm;
}

function period(time) {
    if (time > 12) {
        time = time - 12;
        return time;
    }
    return time;
}

function addZero(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function setCalendarValue() {
    const today = new Date();
    yearEl.innerHTML = today.getFullYear();
    dayNumberEl.innerHTML = today.getDate();
    daysEl.innerHTML = days[today.getDay()];
    monthsEl.innerHTML = month[today.getMonth()];
}

const updateTime = setInterval(clock, 1000);
setCalendarValue();