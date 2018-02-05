const hours   = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const day     = document.querySelector('.day');
const month   = document.querySelector('.month');
const year    = document.querySelector('.year');
const months  = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

function format(value) {
    value = value.toString();

    if(value.length > 1)
        return value;

    return '0' + value;
}

function updateClock() {
    const clock = new Date(Date.now());

    hours.innerHTML   = format(clock.getHours());
    minutes.innerHTML = format(clock.getMinutes());
    seconds.innerHTML = format(clock.getSeconds());
    day.innerHTML     = format(clock.getDay());
    month.innerHTML   = months[clock.getMonth()];
    year.innerHTML    = clock.getFullYear();
}

setInterval(updateClock, 1000);