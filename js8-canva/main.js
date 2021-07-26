const canva = document.querySelector("canvas");
const inputs = [...document.querySelectorAll("input")];
const ctx = canva.getContext("2d");

let lastX, lastY, isDraw=false;

function updateCtx(){
    ctx.strokeStyle = inputs[0].value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = +inputs[1].value;
}

function setCanvaSize(){
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
    updateCtx();
}

function drawCanva(e){
    if(! isDraw) return ;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canva.addEventListener("mousedown", (e) => {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canva.addEventListener("mousemove", drawCanva);

canva.addEventListener("mouseup", (e) => {isDraw=false});

canva.addEventListener("mouseout", (e) => {isDraw=false});

canva.addEventListener("touchstart", (e) => {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
})

canva.addEventListener("touchmove", drawCanva);

canva.addEventListener("touchend", (e) => {isDraw=false});

inputs.forEach(input => {
    input.addEventListener("change", updateCtx);
})

window.onload = window.onresize = setCanvaSize;