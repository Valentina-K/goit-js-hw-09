// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      closePicker(selectedDates[0], this.config.defaultDate);
  },
};

const btnStart = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');
let dateStartMs = null;
console.log(Notify);
flatpickr("#datetime-picker", options);
btnStart.addEventListener('click', onBtnClick); 

function onBtnClick() {
    btnStart.setAttribute('disabled','disabled');  
    const intervalId = setInterval(() => {
        dateStartMs -= 1000;
        if (dateStartMs > 0) {                    
            renderingTimeData(convertMs(dateStartMs));
        }
        else {
            clearInterval(intervalId);
            renderingTimeData(convertMs(0));
        }
    }, 1000);    
}
  
function closePicker(selectedDate, defaultDate) {
    if (selectedDate < defaultDate) {
        Notify.warning('Please choose a date in the future',{position:'center-top'});
        return;
    }
    btnStart.removeAttribute('disabled');
    dateStartMs = selectedDate - defaultDate;
    renderingTimeData(convertMs(dateStartMs));       
}

function renderingTimeData(data) {
    //console.log('from f', data);
    timerFields[0].textContent = addLeadingZero(data.days);
    timerFields[1].textContent = addLeadingZero(data.hours);
    timerFields[2].textContent = addLeadingZero(data.minutes);
    timerFields[3].textContent = addLeadingZero(data.seconds);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time    
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}

