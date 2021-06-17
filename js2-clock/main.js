//setInterval(setDate, 1000);

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

function setDay(){
    let date = new Date();
    const day = document.querySelector(`.day span[data-day="${date.getDay()}"]`);
    day.style.color = "#b36268";
}

//setDay();
//setDate();


