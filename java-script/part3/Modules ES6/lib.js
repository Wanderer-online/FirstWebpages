"use strict";
//каждая экспортируемая сущность должна иметь свое имя!
export let one = 1;

let two = 2;
export { two };

// export function sayHi() {
//это экспорт по умолчанию. Он может быть ТОЛЬКО ОДИН!
export default function sayHi() {//default нужен для упрощения импорта - не нужно будет писать {} вокруг имени
  console.log("hi");
}
