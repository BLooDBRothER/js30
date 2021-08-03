const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip]');
const miniPlayer = player.querySelector(".player__mini");
const videoTime = player.querySelector(".player__time");

//Get readable style
const miniPlayerStyle = getComputedStyle(miniPlayer);

let mid, end, currTime, second, minute;
let isPressed = false;
// miniPlayer.currentTime = 60;

function togglePlay(){
    video.paused ? video.play() : video.pause();
}

function toggleBtn(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function updateTime(){
    currTime = video.currentTime;
    second = Math.floor(currTime % 60);
    minute = Math.floor(currTime / 60);
    videoTime.innerText = `${minute} : ${second}`;
}

function updateSkip(){
    video.currentTime += parseInt(this.dataset.skip);
}

function updateMiniPlayer(e){
    if(!isPressed) return;

    console.log(e.offsetX, miniPlayerStyle.getPropertyValue('left'), miniPlayer.offsetWidth, video.offsetWidth, mid, end);
    if( (e.offsetX < mid) || (e.offsetX >= end)){
        return;
    }
    console.log("hello")
    let percent = (e.offsetX/this.offsetWidth)*100;
    console.log(percent);
    miniPlayer.style.left = `${percent}%`;
    miniPlayer.style.transform = 'translateX(-50%)';
    // miniPlayer.play();
}

skipButtons.forEach(btn => {
    btn.addEventListener("click", updateSkip);
});
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleBtn);
video.addEventListener("pause", toggleBtn);

video.addEventListener("timeupdate", (e) => {
    updateTime();
})

progress.addEventListener("mousedown", () => {
    isPressed = true;
    mid = (miniPlayer.offsetWidth / 2);
    end = video.offsetWidth-mid;
});
progress.addEventListener("mousemove", updateMiniPlayer);