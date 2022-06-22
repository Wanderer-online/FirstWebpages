"use strict";
//возвращают 1 элемент
const box = document.getElementById("box"); //id уникальный, поэтому # не надо
console.log(box);

const oneHeart = document.querySelector("heart");//выдает первый элемент с таким селектором на странице
console.log(oneHeart);

const oneDiv = document.querySelector("div");//выдает первый элемент с таким селектором на странице
console.log(oneHeart);



//возвращают коллекцию элементов
const buttns = document.getElementsByTagName("button"); //возвращает коллекцию (псевдомассив)
console.log(buttns);
console.log(buttns[0]);
console.log(document.getElementsByTagName("button")[3]);

const circles = document.getElementsByClassName("circle"); // перед названием здесь не нужна . он и так работает только с классами
console.log(circles);

const hearts = document.querySelectorAll(".heart"); //а здесь нужно указывать с . # и прочим ибо метод универсальный
//только у этого метода из аналогичных есть for each

console.log(hearts);

hearts.forEach((item) => {
  console.log(item);
});




// dir(box);
box.style.backgroundColor = "blue";//задаем инлайн стили (которые написаны на самом элементе а не в css)
box.style.width = "500px";//без px не работает
buttns[1].style.borderRadius = "100%";
circles[0].style.backgroundColor = "red";

box.style.cssText = "background-color: blue; width: 500px;"; //здесь пишется нормальный css код

// for (let i=0; i<hearts.length; i++){
//     hearts[i].style.backgroundColor = "blue";
// }

hearts.forEach(heart => {heart.style.backgroundColor = "blue";});


const divCuston = document.createElement("div");//создает только внутри жс, на странице его еще нет
// const txt = document.createTextNode("текст");//элементы html в жс называются "ноды"

divCuston.classList.add("black");

// современный метод добавления тегов на страницу
document.body.append(divCuston);//вставляет в конец существующего тега

document.querySelector(".wrapper").append(divCuston);

document.querySelector(".wrapper").prepend(divCuston);//вставляет в начало существующего тега

hearts[0].before("div");//вставить до
hearts[0].after("div");//вставить после

circles[0].remove();//удаление элемента

// замена одного элементад ругим
hearts[1].replaceWith(circles[0]);






//устаревшие команды
// document.querySelector(".wrapper").appendChild(divCuston);//вставляет в конец существующего тега
// document.querySelector(".wrapper").insertBefore(div, hearts[0]);// аналогично before
// document.querySelector(".wrapper").removeChild(hearts[1]);
// document.querySelector(".wrapper").replaceChild(circles[0], hearts[0]);//сначала то на что меняется, потом то что меняется




divCuston.innerHTML = "<h1>text</h1>    ";

// divCuston.textContent = "text";//обычно используется для вывода того что введено пользователем в целях безопасности

divCuston.insertAdjacentElement("afterend", "<h2>text</h2>");
