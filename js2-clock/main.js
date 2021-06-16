let sechand = document.querySelector(".sec");
let minhand = document.querySelector(".min");
let hrhand = document.querySelector(".hr");

function setDate(){
    let date = new Date();
    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hr = date.getHours();
    sechand.style.transform = `rotate(${(sec*6)+90}deg)`;
    minhand.style.transform = `rotate(${(min*6)+90}deg)`;
    hrhand.style.transform = `rotate(${(hr*30)+90}deg)`;
}

setInterval(setDate, 1000);