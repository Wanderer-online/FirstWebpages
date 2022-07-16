"use strict";

// localStorage.setItem("KeyName", 5); //создает или перезаписывает значение в localStorage

// console.log(localStorage.getItem("KeyName")); //вернет 5

// localStorage.removeItem("KeyName"); //удаляет указанный элемент из хранилища
// console.log(localStorage.getItem("KeyName")); //вернет null если больше ничего не было в хранилище

// localStorage.clear(); //очищает хранилище полностью

//**********************
const chkBox = document.querySelector("#checkbox"),
  Form = document.querySelector(".form-signin"),
  colorChangeBtn = document.querySelector("#color");

console.log(typeof localStorage.getItem("isChecked"));
if (localStorage.getItem("isChecked") === "true") {
  chkBox.checked = true;
}

if (localStorage.getItem("bg") === "changed") {
    console.log("!");
  Form.style.backgroundColor = "red";
}

chkBox.addEventListener("change", () => {
  localStorage.setItem("isChecked", chkBox.checked);
});

colorChangeBtn.addEventListener("click", () => {
  if (localStorage.getItem("bg") === "changed") {
    console.log("!!");
    Form.style.backgroundColor = "#fff";
    localStorage.removeItem("bg");
  } else {
    console.log("!!!");
    localStorage.setItem("bg", "changed");
    Form.style.backgroundColor = "red";
  }
});


const persone = {
    name: "Ron",
    age: "25"
};

const serializePersone = JSON.stringify(persone);//без конвертации JSON-ом будет записан [object Object]

localStorage.setItem("Ron", serializePersone);
console.log(JSON.parse(localStorage.getItem("Ron")));//{name: 'Ron', age: '25'}
