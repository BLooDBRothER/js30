let inputs = [...document.querySelectorAll("input[type='checkbox']")];
let shift=false, shiftLast=-1;
let prevIndex = [0];

function unCheckRange(st, en){
    let i = st;
    for(i; i<=en ;i++){
        inputs[i].checked = false;
    }
}

function utilUncheck(st, en, shiftLast){
    // console.log( st, en, shiftLast)
    shiftLast < st ? unCheckRange(shiftLast, en) : unCheckRange(en, shiftLast);
    return st <= en ? st : en;
    // console.log(shiftLast);
}

function checkRangeDown(st, en){
    let i=st;
    // console.log("down", st, en, shiftLast)
    if(( (st == en ) || st > shiftLast) & shiftLast != -1){
        shiftLast = utilUncheck(st, en, shiftLast)
        return;
    }
    for(i; i>en; i--){
        if(!inputs[i].checked)
        {
            inputs[i].checked = true;
            // console.log(i, inputs[i]);
            isAll = 0;
        }
    }
    shiftLast = en;
    // console.log(shiftLast);
}

function checkRangeUp(st, en){
    let i=st;
    // console.log("up", st, en, shiftLast);
    if((en < shiftLast) & shiftLast != -1){
        shiftLast = utilUncheck(st, en, shiftLast)
        return;
    }
    for(i; i<en; i++){
        if(!inputs[i].checked)
        {
            inputs[i].checked = true;
            // console.log(i, inputs[i]);
            isAll = 0;
        }
    }
    shiftLast = en;
}

inputs.forEach(input=>{
    input.addEventListener("click", function(e){
        let res = inputs.findIndex(input => input == this);
        if(!shift) {
            
            if((!this.checked) && (res == prevIndex[1])){
                prevIndex.splice(1, 1);
            }
            else if(this.checked){
                prevIndex[1] = res;
            }
            // console.log(prevIndex);
            return;
        }
        let st = prevIndex.length == 1 ? prevIndex[0] : prevIndex[1];
        st < res ? checkRangeUp(st, res) : checkRangeDown(st, res);
    });
})

window.addEventListener("keydown", (e)=>{
    if(e.key != "Shift") return;
    shift=true;
});
window.addEventListener("keyup", (e)=>{shift=false;});