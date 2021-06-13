
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

window.addEventListener("keydown", function(e){
    const aud = document.querySelector(`audio[data-key=${t[e.keyCode]}]`);
    if(!aud) return;
    aud.currentTime = 0;
    aud.play();
});