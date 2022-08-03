"use strict";

import { tns } from "../node_modules/tiny-slider/src/tiny-slider";
// https://github.com/ganlanyuan/tiny-slider

tns({
    container: '.container',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    fixedWidth: 600,
    viewportMax: 600
    // autoWidth:true
  });
  