const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const miniPlayer = player.querySelector(".player__mini");
const videoTime = player.querySelector(".player__time");

let mid, end, currTime, second, minute;
let isPressed = false;
miniPlayer.currentTime = 0;

function returnOffset(e){
    return e.offsetX || e.touches[0].pageX
}

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

function updateProgress(){
    let percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function forwardProgress(e, elem){
    console.log(returnOffset(e));
    let percent = (returnOffset(e)/elem.offsetWidth)*100;
    console.log(percent);
    let currTime = (percent/100)*video.duration;
    miniPlayer.currentTime = currTime;
    // progressBar.style.flexBasis = `${percent}%`;
}

function updateMiniPlayer(e, elem){
    if( (returnOffset(e) < mid) || (returnOffset(e) >= end)){
        return;
    }
    let percent = (returnOffset(e)/elem.offsetWidth)*100;
    miniPlayer.style.left = `${percent}%`;
    miniPlayer.style.transform = 'translateX(-50%)';
}

skipButtons.forEach(btn => {
    btn.addEventListener("click", updateSkip);
});
toggle.addEventListener("click", togglePlay);
ranges.forEach(range => {
    range.addEventListener("input", function(e){
        video[this.name] = this.value;
    });
});

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleBtn);
video.addEventListener("pause", toggleBtn);

video.addEventListener("timeupdate", (e) => {
    updateTime();
    updateProgress();
});

video.addEventListener("canplaythrough", function(e){
    console.log(e);
})

progress.addEventListener("mousedown", function(e){
    miniPlayer.style.display = "initial";
    isPressed = true;
    mid = (miniPlayer.offsetWidth / 2);
    end = video.offsetWidth-mid;
    updateMiniPlayer(e, this);
    forwardProgress(e, this);
});

progress.addEventListener("mousemove", function(e){
    if(!isPressed) return;

    updateMiniPlayer(e, this);
    forwardProgress(e, this);
});

progress.addEventListener("mouseup", function(e){
    miniPlayer.style.display = "none";
    isPressed = false;
    video.currentTime = miniPlayer.currentTime;
});

progress.addEventListener("mouseleave", function(e){
    if(!isPressed) return;
    miniPlayer.style.display = "none";
    isPressed = false;
    video.currentTime = miniPlayer.currentTime;
});

progress.addEventListener("touchstart", function(e){
    console.log("hello");
    miniPlayer.style.display = "initial";
    isPressed = true;
    mid = (miniPlayer.offsetWidth / 2);
    end = video.offsetWidth-mid;
    updateMiniPlayer(e, this);
    forwardProgress(e, this);
});

progress.addEventListener("touchmove", function(e){
    console.log("hello");

    if(!isPressed) return;

    updateMiniPlayer(e, this);
    forwardProgress(e, this);
});

progress.addEventListener("touchend", function(e){
    console.log("hello");
    miniPlayer.style.display = "none";
    isPressed = false;
    video.currentTime = miniPlayer.currentTime;
});