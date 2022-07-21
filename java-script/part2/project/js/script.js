"use strict";

window.document.addEventListener("DOMContentLoaded", () => {

    const tabs = require("./modules/tabs"),
    modal = require("./modules/modal"),
    calc = require("./modules/calc"),
    cardClasses = require("./modules/card-classes"),
    dbGet = require("./modules/db-get"),
    forms = require("./modules/forms"),
    showModal = require("./modules/show-modal"),
    sliderNav = require("./modules/slider-nav"),
    slider = require("./modules/slider"),
    timer = require("./modules/timer");

    tabs();
    modal();
    calc();
    cardClasses();
    dbGet();
    forms();
    showModal();
    sliderNav();
    slider();
    timer();
});
