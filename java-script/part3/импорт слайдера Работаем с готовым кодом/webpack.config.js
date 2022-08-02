'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'compiled.js'
  },
  watch: true,

  devtool: "source-map",

  
};
