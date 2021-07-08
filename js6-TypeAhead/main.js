const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = []

fetch(endpoint)
    .then(res => res.json())
    .then(data => cities.push(...data));

function matchPlace(data, cities){
    const re = new RegExp(data, "gi");
    return cities.filter((place) => {
        return place.city.match(re) || place.state.match(re);
    });
}

function liTrans(){
    let lie = document.querySelectorAll("li:nth-child(even)");
    let lio = document.querySelectorAll("li:nth-child(odd)");
    lie.forEach(li => {
        li.addEventListener("mouseenter", function(e){
            li.style.transform = "none";
            li.style.background = "black";
            li.style.color = "white";
        });
        li.addEventListener("mouseleave", function(e){
            li.style.background = "linear-gradient(to bottom,  #ffffff 0%,#EFEFEF 100%)";
            li.style.color = "black";
            li.style.transform = "perspective(100px) rotateX(3deg) translateY(2px) scale(1.001)";
        });
    });
    lio.forEach(li => {
        li.addEventListener("mouseenter", function(e){
            li.style.transform = "none";
            li.style.background = "black";
            li.style.color = "white";
        });
        li.addEventListener("mouseleave", function(e){
            li.style.background = "linear-gradient(to bottom,  #ffffff 0%,#EFEFEF 100%)";
            li.style.color = "black";
            li.style.transform = "perspective(100px) rotateX(-3deg) translateY(3px)";
        });
    });
}

const input = document.querySelector("input");
const sug = document.querySelector(".suggestion");
let old;

input.addEventListener("input", function(e){
    sug.innerHTML = "";
    if(this.value == "") return;
    let res = matchPlace(this.value, cities);
    const re = new RegExp(this.value, "gi");
    sug.innerHTML = res.map(place => {
        let city = place.city.replace(re, `<span class="highlighted">${this.value}</span>`);
        let state = place.state.replace(re, `<span class="highlighted">${this.value}</span>`);
        return `<li><span class="place">${city}, ${state}</span> <span class="population">${place.population}</span></li>`
    }).join("");
    liTrans();
});

liTrans();






