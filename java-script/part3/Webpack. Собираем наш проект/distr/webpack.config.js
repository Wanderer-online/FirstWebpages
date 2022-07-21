"use strict";

let path = require("path");

module.exports = {
  mode: "development",//development - для разработки, production - для продукта (по умолчанию)
  entry: "./src/js/script.js",//начальный файл js, в котором находятся все зависимости, если файлов несколько - нужно создать объект
  output: {//выходной файл, всегда задается как объект
    filename: "bundle.js",//имя
    path: __dirname + "/dist/js",//__dirname = корневая папка проекта
  },
  watch: true,//после вызова webpack будет отслеживать изменение исходных файлов и собирать проект при каждом изменении (настраивается)
  devtool: "source-map",//сохранение исходников
  module: {},//дополнительные модули webpack
  //,plugins:{}//подключение плагинов
};
