"use strict";

let path = require("path");

module.exports = {
  mode: "development",//development - для разработки, production - для продукта (по умолчанию)
  entry: "./js/script.js",//начальный файл js, в котором находятся все зависимости, если файлов несколько - нужно создать объект
  output: {//выходной файл, всегда задается как объект
    filename: "compiled.js",//имя
    path: __dirname + "/dist/js",//__dirname = корневая папка проекта
  },
  watch: true,//после вызова webpack будет отслеживать изменение исходных файлов и собирать проект при каждом изменении (настраивается)
  devtool: "source-map",//сохранение исходников
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ] 
  },//дополнительные модули webpack
  //,plugins:{}//подключение плагинов
};
