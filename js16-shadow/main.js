const hero = document.querySelector(".hero");
const text = hero.querySelector('h1');
const walk = 500;

function moveShadow(e){
    let {offsetWidth: width, offsetHeight: height} = hero;
    let {offsetX: x, offsetY: y} = e;
    if(this !== e.target){
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }
    const walkX = ((x/width)*walk) - (walk/2);
    const walkY = ((y/height)*walk) - (walk/2);
    
    text.style.textShadow = `
        ${walkX}px ${walkY}px 0 red, 
        ${walkX*-1}px ${walkY}px 0 blue, 
        ${walkX}px ${walkY*-1}px 0 green, 
        ${walkX*-1}px ${walkY*-1}px 0 yellow 
    `
}

hero.addEventListener("mousemove", moveShadow);