"use strict";

//импортируется объект из которого вытаскиваются переменные и методы - это именованый синтаксис

// import{one,two} from "./lib";//опять без .js
// console.log(`${one} and ${two}`);
// import{one as first,two} from "./lib";//при импорте можно переименовать сущность
// console.log(`${first} and ${two}`);
import * as data from "./lib";//импорт всех сущностей которые экспортирует этот файл
import sayHi from "./lib";//благодаря тому что там стоит default - {} вокруг имени не нужны

console.log(`${data.one} and ${data.two}`);
data.sayHi();
