const inputs = document.querySelectorAll(".controls input");

function setcolor(){
    document.documentElement.style.setProperty(`--base`, inputs[2].value);
}

function handleUpdates(inp){
    let val = inp.dataset.sizing || "";
    let output = inp.value+val;
    document.documentElement.style.setProperty(`--${inp.name}`, output);
}

inputs.forEach(input => input.addEventListener("input", () => { handleUpdates(input); }));

inputs.forEach(input => input.addEventListener("wheel", (e) => {
    if(input.name == "base") return;
    e.deltaY > 0 ? input.value-- : input.value++;
    handleUpdates(input);
}));


setcolor();