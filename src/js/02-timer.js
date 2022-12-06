// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";

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

flatpickr("#datetime-picker", options);
btnStart.addEventListener('click', onBtnClick); 

function onBtnClick() {
    btnStart.setAttribute('disabled','disabled');  
    const intervalId = setInterval(() => {
        if (dateStartMs > 0) {
            dateStartMs -= 1000;        
        f(convertMs(dateStartMs));
        }
        else {
            clearInterval(intervalId);
            f(convertMs(0));
        }
    }, 1000);    
}
  
function closePicker(selectedDate, defaultDate) {
    if (selectedDate < defaultDate) {
          alert('Please choose a date in the future')
          return;
    }
    btnStart.removeAttribute('disabled');
    dateStartMs = selectedDate - defaultDate;
    f(convertMs(dateStartMs));       
}

function f(data) {
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

