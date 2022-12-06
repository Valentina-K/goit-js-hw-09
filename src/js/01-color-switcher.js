class TimerColor{
  constructor({onTick}) {
    this.intervalId = null;
    this.isStarted = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    this.intervalId = setInterval(() => {
      this.onTick();
    }, 1000);    
  }

  stop() {
    clearInterval(this.intervalId);
    this.isStarted = false;
  }  
}

const refs = {
    bodyRef: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}

const timerColor = new TimerColor({
  onTick: updateColor
});

refs.btnStart.addEventListener('click', () => timerColor.start());
refs.btnStop.addEventListener('click', () => timerColor.stop());

function updateColor() {
  refs.bodyRef.setAttribute('style', `background-color: ${getRandomHexColor()}`);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}