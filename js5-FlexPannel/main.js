const panels = document.querySelector(".panels");
const panel = document.querySelectorAll(".panel");
const panelP = document.querySelectorAll(".panel > *");
let i=0, j=0, init=1;
let autoval = true;

function toggleFlex(){
    this.classList.toggle("open");
    setTimeout(() => {
        this.classList.toggle("open-active");
    }, 700);
    init = 0;
    move = true
}

function changeColor(e){
    console.log(e);
    let x = e.clientX;
    let y = e.clientY;
    let select = document.elementFromPoint(x, y);
    let red = Math.floor((Math.random() * 255));
    let blue = Math.floor((Math.random() * 255));
    let green = Math.floor((Math.random() * 255));
    select.style.color = `rgb(${red}, ${green}, ${blue})`;
}

function autoLoopOpen(){
    panel[i].classList.toggle("open");
    setTimeout(autoLoopClose, 1500);
    console.log(panel[i]);
    i >= 4 ? (i = 0) : i++;
    console.log(panel[i]); 
}

function autoLoopClose(){
    panel[j].classList.toggle("open");
    console.log(panel[j]);
    j >= 4 ? (j = 0) : j++; 
    console.log(panel[j]);
}

function autoCheck(){
    if(init){
        setInterval(autoLoopOpen, 2200);
        init = 0;
    }
}

panel.forEach(pan => {
    pan.addEventListener("mouseenter", toggleFlex);
    pan.addEventListener("mouseleave", toggleFlex);
    pan.addEventListener("mousemove", changeColor)
});

// autoCheck();


