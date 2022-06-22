"use strict";
//возвращают 1 элемент
const box = document.getElementById("box"); //id уникальный, поэтому # не надо
console.log(box);

const oneHeart = document.querySelector(".heart");//выдает первый элемент с таким селектором на странице
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
