"use strict";

// const app = "123";

//################################# Анонимная самовызывающаяся функция
const number = 1;

//(function(){}());//анонимная самовызывающаяся функция

(function(){
    let number=2;
    console.log(number);//2
    console.log(number+3);//5

}());

console.log(number);//1




//################################# Объектный интерфейс

const user = (function(){
    const privat = function(){
        console.log("privat was called");
    };

    return {
        sayHello: privat//методу sayHello передается ссылка на приватную функцию privat
    };
}());

user.sayHello();//запуск приватной функции
