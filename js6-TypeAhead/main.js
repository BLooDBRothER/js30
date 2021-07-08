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

const input = document.querySelector("input");
const sug = document.querySelector(".suggestion");
const li = document.querySelector("li");

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

});


