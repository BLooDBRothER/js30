const inputs = document.querySelectorAll(".controls input");

function setcolor(){
    document.documentElement.style.setProperty(`--base`, inputs[2].value);
}

function handleUpdates(){
    console.log(this.value, this.dataset);
    let val = this.dataset.sizing || "";
    let output = this.value+val;
    document.documentElement.style.setProperty(`--${this.name}`, output);
}

inputs.forEach(input => input.addEventListener("input", handleUpdates));
//inputs.forEach(input => input.addEventListener("wheel", handleUpdates));

//console.log(window.screen.orientation.lock);

setcolor();