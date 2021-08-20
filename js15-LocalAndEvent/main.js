const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

let text;

function updateLocalStorage(){
    localStorage.setItem("items", JSON.stringify(items));
}

function addItem(e){
    e.preventDefault();
    text = (this.querySelector("input[name='item']")).value; 
    let item = {
        text,
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    updateLocalStorage();
    this.reset();
}

function populateList(dish = [], plateList){
    plateList.innerHTML = dish.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} data-item="${item.text}" id="${item.text}" ${item.done ? "checked" : ""}>
                <label for="${item.text}">${item.text}</label>
            </li>`
    }).join("");
}

function toggleCheck(e){
    if(!e.target.matches("input")) return;
    let elem = e.target;
    items[elem.dataset.index].done = elem.checked;
    updateLocalStorage();
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleCheck)

populateList(items, itemsList);