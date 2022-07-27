"use strict";

//cd "G:\VS Code HTML Projects\FirstWebpages\java-script\part2\project"
//npm init -y
//npx webpack

// import "core-js/stable";

// импорт возможен только на самом верхнем уровне видимости
import tabs from "./modules/tabs";
import modal from "./modules/modal";
import calc from "./modules/calc";
import cardClasses from "./modules/card-classes";
import forms from "./modules/forms";
import showModal from "./modules/show-modal";
import slider from "./modules/slider";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.document.addEventListener("DOMContentLoaded", () => {
  //                                                      ************ раскомментировать перед деплоем
  const modalTimerID = setTimeout(() => {
    openModal(".modal", modalTimerID);
    console.log("timer-set");
  }, 30000);

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerID);
  calc();
  cardClasses();
  forms("form", modalTimerID);
  showModal();
  slider({
    prevArrow:".offer__slider-prev",
    totalCounter:"#total",
    field:".offer__slider-inner",
    nextArrow:".offer__slider-next",
    currentCounter:"#current",
    wrapper:".offer__slider",
    container:".offer__slide"
  });

  timer(".timer", "2022-09-12");
});
