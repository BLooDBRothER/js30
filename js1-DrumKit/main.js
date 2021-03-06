const txt = document.querySelector(".txt-cnt");
const point = document.querySelector(".point");
const keys = document.querySelectorAll(".key");
let pt = 0;
let fl = 0;
point.innerHTML = pt;
let snd;
let t = {
    65:"boom",
    66:"tink",
    67:"hihat",
    68:"hihat",
    69:"hihat",
    70:"kick",
    71:"openhat",
    72:"ride",
    73:"tink",
    74:"snare",
    75:"tink",
    76:"tom",
    77:"snare",
    78:"ride",
    79:"tom",
    80:"kick",
    81:"boom",
    82:"kick",
    83:"clap",
    84:"openhat",
    85:"snare",
    86:"kick",
    87:"clap",
    88:"clap",
    89:"ride",
    90:"boom"
}

keys.forEach(key => {
    key.addEventListener("transitionend", function(e){
        key.classList.remove("pressed");
    });

    key.addEventListener("click", (e) => {
        activateKey(key.firstElementChild.innerHTML);
    });
});

window.addEventListener("keydown", (e) => {
    activateKey(e.key)
});

function activateKey(keyValue){
    let ascii = keyValue.length == 1 ? keyValue.toUpperCase().charCodeAt() : "";
    const aud = document.querySelector(`audio[data-key=${t[ascii]}]`);
    const key = document.querySelector(`.key[data-key='${ascii}']`);
    if(!aud) return;
    key.classList.add("pressed");
    check(t[ascii], snd);
    aud.currentTime = 0;
    aud.play();
}

function addtag(data){
    let dt = document.createElement("p");
    dt.innerHTML = data.toUpperCase();
    txt.appendChild(dt);
    setTimeout(()=>{
        remtag(dt);
    },1800);
}

function remtag(data){
    txt.classList.remove("green");
    fl = 0;
    snd = "";
    txt.removeChild(data);
}

function game(){
    let rnd = Math.floor(Math.random()*(90-65) + 65);
    snd = t[rnd];
    addtag(snd);
}

function check(key, ori){
    if(key == ori && fl == 0){
        point.innerHTML = ++pt;
        txt.classList.add("green");
        fl = 1;
    }
}
setInterval(() => {
    game();
}, 2000);
