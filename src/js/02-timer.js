import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const button = document.querySelector("[data-start ]");
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]')
let leftTime = 0;





const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
       Date.now() >= selectedDates[0]
            ? (Notify.failure('Please, choose date in the future'), button.setAttribute('disabled', 'true'))
            : button.removeAttribute('disabled');
        
          button.dataset.start  = new Date(selectedDates[0]).getTime();

  },
};
flatpickr('#datetime-picker', options);


button.addEventListener("click", onClick);

function onClick(evt) {
    evt.target.setAttribute('disabled', 'true');
    const timer = setInterval(() => {
        leftTime = Number(button.dataset.start) - Date.now();
        const { days, hours, minutes, seconds } = convertMs(leftTime);
        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
        
        if (leftTime <= 999) {
            clearInterval(timer)
        }
    }, 1000);
    

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
   return value.toString().padStart(2,"0");
}