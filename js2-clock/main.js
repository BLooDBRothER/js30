setInterval(setDate, 1000);

let sechand = document.querySelector(".sec");
let minhand = document.querySelector(".min");
let hrhand = document.querySelector(".hr");
let day = document.querySelector(".day-no");
let mon = document.querySelector(".mon");
let year = document.querySelector(".year");


function setDate(){
    let date = new Date();
    let sec = date.getSeconds() / 60;
    let min = (sec + date.getMinutes()) / 60;
    let hr = (min + date.getHours()) / 12;
    setHand(sechand, sec);
    setHand(minhand, min);
    setHand(hrhand, hr);
}

function setHand(element, degree){
    if(element.className == "hand sec" && degree == 0){
        element.style.transition = "none";
    }
    else{
        element.style.transition = "transform .1s cubic-bezier(0, 2.15, 0.25, 1)";
    }
    element.style.setProperty('--hand', degree * 360)
}

function setDay(){
    let date = new Date();
    const day = document.querySelector(`.day span[data-day="${date.getDay()}"]`);
    day.style.color = "#b36268";
    day.style.animation = "blink 1s ease infinite"
}

function setcurrdate(){
    let date = new Date();
    day.innerText = date.getDate();
    mon.innerText = date.getMonth();
    year.innerText = date.getFullYear();
}

setcurrdate()
setDay();
setDate();


