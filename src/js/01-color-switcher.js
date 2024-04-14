

const body = document.querySelector("body");

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let changeColor = null;

start.addEventListener('click', () => {
    start.setAttribute('disabled', 'true');
    stop.removeAttribute('disabled');
    changeColor = setInterval(() => { body.style.backgroundColor = getRandomHexColor() }, 1000)
});

stop.addEventListener('click', () => {
    stop.setAttribute('disabled', 'true');
    start.removeAttribute('disabled');
    clearInterval(changeColor)
});




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}