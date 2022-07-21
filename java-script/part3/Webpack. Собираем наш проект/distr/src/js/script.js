"use strict";
const myModuleInporting = require("./lib");// "/." - текущий каталог в котором хранится ЭТОТ файл, lib - имя импортируемого файла без .js

const myModuleInstance = new myModuleInporting();//инициализация импортируемого из другого файла объекта
myModuleInstance.hello();//запуск функции импортируемого из другого файла объекта
myModuleInstance.goodby();
