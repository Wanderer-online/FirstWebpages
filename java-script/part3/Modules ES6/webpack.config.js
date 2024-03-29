"use strict";
let path = require("path");
module.exports = {
mode: "development",//development - для разработки, production - для продукта (по умолчанию)
  entry: "./script.js",//начальный файл js, в котором находятся все зависимости, если файлов несколько - нужно создать объект
  output: {//выходной файл, всегда задается как объект
    filename: "compiled.js",//имя
    path: __dirname,//__dirname = корневая папка проекта
  },
  watch: true,//после вызова webpack будет отслеживать изменение исходных файлов и собирать проект при каждом изменении (настраивается)
  devtool: "source-map",//сохранение исходников
  module: {},//дополнительные модули webpack
  //,plugins:{}//подключение плагинов
};
