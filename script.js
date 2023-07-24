class App{
timer = {
    min_tens: document.getElementById('min_tens'),
    min: document.getElementById('min'),
    sec_tens: document.getElementById('sec_tens'),
    sec: document.getElementById('sec'),
};
#interval;
#isPaused = false;
#timeStopped = null;
submit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const time = formData.get('time')
    this.#clearTimer();
    (!this.#isPaused) ? this.#startTimer(time) : this.#startTimer(this.#timeStopped);
}
#clearTimer(){
    if(this.#interval){
        clearInterval(this.#interval)
    }
    this.#setTimer({min_tens:0, min:0 , sec_tens:0, sec:0})
    this.#removePauseButton();
    this.#removeStopButton();
}
#startTimer (time){
    const end = Date.now() + time*1000*60;
    this.#interval = setInterval(()=> {
        const now = Date.now();
        const delta = end - now;
        if (delta < 0){
            clearInterval(this.#interval);
            this.#removeStopButton();
            return;
        }
        this.#timeStopped = delta / 1000 / 60;  // Update timeStopped every second
        this.#setTimer({
            min_tens:Math.floor(delta / 1000 / 60 / 10),
            min:Math.floor((delta / 1000 / 60) % 10),
            sec_tens:Math.floor((delta % 60000) / 10000),
            sec:Math.floor(((delta % 60000) / 1000) % 10),
        });
    }, 500);
    document.querySelector('.dots').style.color = "#6C38CC"
    this.#createPauseButton();
    this.#createStopButton();
}

#createStopButton (){
    let stopButton = document.createElement('button');
    stopButton.className = 'stopButton';
    stopButton.innerHTML = `<img src="./images/stop-circle.svg" alt="Иконка play">
    Закончить`
    stopButton.onclick= ()=>{
        this.#isPaused = false;
        this.#clearTimer();
        document.querySelector('.dots').style.color = "white"
    }
    let buttonsDiv = document.querySelector('.buttons');
    buttonsDiv.appendChild(stopButton);
}
#removeStopButton (){
    let stopButton = document.querySelector('.stopButton');
    if (stopButton){
        stopButton.remove();
    }
}
#createPauseButton (){
    let pauseButton = document.createElement('button');
    pauseButton.className = 'pauseButton';
    pauseButton.innerHTML = `<img src="./images/pause-circle.svg" alt="Иконка play">
    Пауза`
    pauseButton.onclick= ()=>{
        this.#isPaused = true;
        clearInterval(this.#interval);
        this.#removePauseButton();
        document.querySelector('.dots').style.color = "white"
    }
    let buttonsDiv = document.querySelector('.buttons');
    buttonsDiv.appendChild(pauseButton);
}

#removePauseButton (){
    let pauseButton = document.querySelector('.pauseButton');
    if (pauseButton){
        pauseButton.remove();
    }
}
#setTimer ({min_tens, min, sec_tens, sec}){
this.timer.min_tens.innerText =min_tens;
this.timer.min.innerText =min;
this.timer.sec_tens.innerText =sec_tens;
this.timer.sec.innerText =sec;
}

#togglePause () {
    if (this.#isPaused){

    }

}
}
const app = new App();
