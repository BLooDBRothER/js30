const canvas = document.querySelector("canvas");
const inputs = [...document.querySelectorAll("input ")];
const clear = document.getElementById("clear");
const erase = document.getElementById("eraser");
const ctx = canvas.getContext("2d");

let lastX, lastY, isDraw=false, hue=0, direction=true;

function changeWidth(val){
    if(+inputs[1].value + val < 6) return;
    inputs[1].value = +inputs[1].value + val;
    updateCtx()
}

function updateCtx(){
    if(+inputs[1].value < 6) 
        inputs[1].value = 6;
    ctx.strokeStyle = inputs[0].value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = +inputs[1].value;
}

function setCanvaSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCtx();
}

function drawCanva(e){
    if(! isDraw) return ;
    if(canvas.classList.contains("erase")){
        ctx.strokeStyle = "#000";
    }

    if(inputs[2].checked){
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        if (hue >= 360) {
            hue = 0;
        }
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
        }
    
        if(direction) {
        ctx.lineWidth++;
        } else {
        ctx.lineWidth--;
        }
        hue++;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX || e.touches[0].pageX, e.offsetY || e.touches[0].pageY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX || e.touches[0].pageX, e.offsetY || e.touches[0].pageY];
}

function eraseCanva(){
    ctx.strokeStyle = "#000";
}

canvas.addEventListener("mousedown", (e) => {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", drawCanva);

canvas.addEventListener("mouseup", (e) => {isDraw=false});

canvas.addEventListener("mouseout", (e) => {isDraw=false});

canvas.addEventListener("touchstart", (e) => {
    isDraw = true;
    [lastX, lastY] = [e.offsetX || e.touches[0].pageX, e.offsetY || e.touches[0].pageY];
})

canvas.addEventListener("touchmove", drawCanva);

canvas.addEventListener("touchend", (e) => {isDraw=false});

inputs.forEach(input => {
    input.addEventListener("change", updateCtx);
});


erase.addEventListener("click", (e) => {
    canvas.classList.toggle("erase");
    erase.classList.toggle("active");
    updateCtx();
});

clear.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
});

window.addEventListener("keydown", (e) => {
    console.log(e, e.key);
    if(e.ctrlKey && (e.key === "c" || e.key === "C")){
        clear.click();
    }
    if(!(e.key === "[" || e.key === "]" || e.key === "e" || e.key === "E")) return ;
    e.key === "[" ? changeWidth(2) : changeWidth(-2);
    (e.key === "e" || e.key === "E") ? erase.click() : "";
})

window.onload = window.onresize = setCanvaSize;