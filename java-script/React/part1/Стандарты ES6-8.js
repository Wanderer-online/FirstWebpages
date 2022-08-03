"use strict";

//######################## контекст вызова
let obj = {
	number: 5,
	sayNumber: function () {
		function say() {
			//эта функция теряет свой контекст вызова и переходит на глобальный контекст
			console.log(this);
		}
		say();
	},
};
obj.sayNumber(); //window global object

let objArrowFunction = {
	number: 5,
	sayNumber: function () {
		const say = () => {
			//стрелочные функции не имеют собственного контекста вызова, они его наследуют от родителя
			console.log(this);
		};
		say();
	},
};
objArrowFunction.sayNumber(); // { number: 5, sayNumber: [Function: sayNumber] }

//######################## методы map() filter() для перебора массивов
const names = ["Ivan", "Ann", "Cheushesku", "Dracula"];
const shortNames = names.filter((name) => {
	return name.length < 5;
});
console.log(shortNames); //[ 'Ivan', 'Ann' ]

let users = ["IvaN", "BorIS", "KlaUS"];
users = users.map((item) => {
	return item.toLowerCase();
});
console.log(users); //[ 'ivan', 'boris', 'klaus' ]

//######################## интерполяция
console.log(`User${users[1]}, is online`);

//######################## параметры по умолчанию
function fetchData(data, count = 0) {
	console.log(`User data ${data}, in count ${count}`);
}
fetchData("something");

//######################## rest-параметр функции
function letsRest(...someVarName) {
	console.log(someVarName); //возвращает массив
}
letsRest(3, 5, "ff", true); //[ 3, 5, 'ff', true ]

function letsRestPlus(a, b, ...someVarName) {
	console.log(`a=${a}, b=${b}`);
	console.log(someVarName); //возвращает массив
}
letsRestPlus(3, 5, "ff", true); //a=3, b=5 [ 'ff', true ]

//######################## spread-оператор
const arr1 = [1, 4, 8],
	arr2 = [5, 7, 15];
console.log(...arr1, ...arr2); //1 4 8 5 7 15
const resMax = Math.max(200, ...arr1, 9, ...arr2);
console.log(resMax); //200

//########################ES-6 bject.assign() объединить несколько объектов с перезаписью свойств
const avatar = "defaultImage";
const someUser = {
	name: "default",
	pass: "qwerty",
	rights: "user",
};
const admin = {
	name: "admin",
	rights: "root",
};
const combinedES6 = Object.assign(someUser, admin); // работает только с объектами, переменные не обрабатывются нормально
console.log(combinedES6); //{ name: 'admin', pass: 'qwerty', rights: 'root' }
console.log(someUser.name); //"admin" - параметр в исходном объекте изменился!

//########################ES-8 object spread-оператор
const combinedES8 = { ...someUser, ...admin, avatar };
console.log(combinedES8); //{ name: 'admin', pass: 'qwerty', rights: 'root', avatar: 'defaultImage' }
console.log(someUser.name); //"default" - параметр в исходном объекте НЕ изменился

//это работает только если свойство объекта имеет такое же имя как и переменная!
const x = 25,
	y = 10;
const coordinates = {
	// x:x,
	//y:y,
	// calcSquare:function(){console.log(this.x*this.y);}
	x,
	y,
	calcSquare() {
		console.log(this.x * this.y);
	},
};
coordinates.calcSquare(); //250

//######################## Деструктуризация
//############ Объектов:
//https://learn.javascript.ru/destructuring-assignment
const someAnotherUser = {
	Username: {
		first: "Sam",
		second: "Johnes",
	},
	pass: "qwerty",
	rights: "user",
};
const someVar = someAnotherUser.Username;
console.log(someVar); //default
const {
	Username: { first, second },
	pass,
	rights,
} = someAnotherUser; //создаются 3 новые переменные: Username=someAnotherUser.name, pass=someAnotherUser.pass, rights=someAnotherUser.rights
console.log(first, second, pass, rights); //Sam Johnes qwerty user
//############ Важный нюанс!!! - имена переменных и имена параметров объекта должны совпадать, если переменная с таким именем уже есть - она будет перезаписана!!!
//Если мы хотим присвоить свойство объекта переменной с другим названием, то мы можем использовать двоеточие
const {pass: customPassVar}=someAnotherUser; //customPassVar будет именем переменной
const {Username:{first:customVarName}} = someAnotherUser;
//Двоеточие показывает «что : куда идёт»

//!!!Важно!!! параметры по умолчанию для передаваемых как параметры функции объектов
function connect({ host = "localhost", port = 3000, user = "default" } = {}) {
	console.log(`host=${host}, port=${port}, user=${user}`);
}
connect({
	port: 2424,
	user: "Alfred",
}); //host=localhost, port=2424, user=Alfred
connect({}); //host=localhost, port=3000, user=default
connect(); //error, если в параметрах функции нет {......} = {})

//вложенные массивы
const numbers = [
	[2, 5],
	[7, 3],
];
const [[a, b], [c, d]] = numbers;
console.log(a, b, c, d); //2 5 7 3

const country = {
	name: "England",
	population: 200000,
	gender: {
		male: ["15%", "40%"],
		female: ["16%", "29%"],
	},
};
// country.gender.male[0];
const {
	gender: {
		male: [maleUnder18, maleAdult],
		female: [femaleUnder18, femaleAdult],
	},
} = country;//maleUnder18=country.gender.male[0], maleAdult=country.gender.male[1], femaleUnder18, femaleAdult
console.log(maleUnder18,femaleAdult);//15% 29%
