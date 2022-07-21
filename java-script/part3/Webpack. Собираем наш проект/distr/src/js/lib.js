"use strict";

function myModule() {
    this.hello = function () {
      console.log("hello");
    };
    this.goodby = function () {
      console.log("goodby");
    };
  }

  module.exports = myModule;//здесь указывается какой модуль из этого файла идет в экспорт
