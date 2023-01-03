import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let todaysDate = new Date();
let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= todaysDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

const addLeadingZero = value => {
  return value.padStart(2, '0');
};
function convertMs(ms) {
  todaysDate = new Date();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  timerDays.innerHTML = days;
  timerHours.innerHTML = addLeadingZero(String(hours));
  timerMinutes.innerHTML = addLeadingZero(String(minutes));
  timerSeconds.innerHTML = addLeadingZero(String(seconds));
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  const timer = setInterval(() => {
    let timeDiff = selectedDate.getTime() - todaysDate.getTime();
    if (timeDiff > 0) {
      convertMs(timeDiff);
    } else {
      clearInterval(timer);
      Notify.info('Time is up');
    }
  }, 1000);
});