function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const slider = document.querySelectorAll(".slide-in");

function scrollCheck(e) {
  slider.forEach(image => {
    const slideInAt = window.scrollY + window.innerHeight - (image.height/2);
    const bottomPos = image.offsetTop + image.height;
    const isHalf = slideInAt >= image.offsetTop;
    const isPast = window.scrollY <= bottomPos;
    console.log(isHalf, isPast);
    if(isHalf && isPast){
      image.classList.add("active");
    }
    else{
      image.classList.remove("active");
    }
  });
  
}

window.addEventListener("scroll", debounce(scrollCheck));