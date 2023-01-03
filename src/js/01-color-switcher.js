function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');
let timerId = null;


stopButton.setAttribute('disabled', '');
startButton.addEventListener("click", () => {
    startButton.setAttribute('disabled', '');
    stopButton.removeAttribute('disabled', '');
    timerId = setInterval(() => {
        bodyColor.style.backgroundColor = `${getRandomHexColor()}`
    }, 1000)
    ;
})

stopButton.addEventListener("click", () => {
    clearInterval(timerId);
    startButton.removeAttribute('disabled', '');
    stopButton.setAttribute('disabled', '');
    timerId = null;
})