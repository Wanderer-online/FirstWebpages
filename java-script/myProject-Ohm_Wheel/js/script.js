"use strict";

window.document.addEventListener("DOMContentLoaded", () => {
  let selectedFormulaIndex = "p1";

  // select svg elements
  const elements = Array.from(document.querySelectorAll("svg#main-svg g"));
  const center = Array.from(document.querySelectorAll("svg#main-svg .center"));
  // console.log(elements);

  // add event listeners
  elements.forEach(function (el) {
    el.addEventListener("mousedown", start);
  });

  // event listener functions

  function start(e) {
    // console.log(e.currentTarget.id);
    formulaChoose(e.currentTarget.id);
    selectedFormulaIndex = e.currentTarget.id;
    document.querySelector(".value1").value="";
    document.querySelector(".value2").value="";
    document.querySelector(".output").textContent="0";

    // calculations();
  }

  const calculations = function () {
    let v1 = document.querySelector(".value1").value;
    let v2 = document.querySelector(".value2").value;
    let output = document.querySelector(".output");
    let temp = 0;
    if (v1 !== "" && v2 !== "" && v1 > 0 && v2 > 0) {
      v1 = parseFloat(v1);
      v2 = parseFloat(v2);

      switch (selectedFormulaIndex) {
        case "p1":
        case "p10":
          temp = v1 * v2;
          break;
        case "p2":
        case "p4":
        case "p7":
        case "p8":
          temp = v1 / v2;
          break;
        case "p3":
          temp = Math.sqrt(v1 * v2);
          break;
        case "p5":
          temp = Math.pow(v1, 2) / v2;
          break;
        case "p6":
          temp = v1 / Math.pow(v2, 2);
          break;
        case "p9":
          temp = Math.sqrt(v1 / v2);
          break;
        case "p11":
          temp = Math.pow(v1, 2) * v2;
          break;
        case "p12":
          temp = Math.pow(v1, 2) / v2;
          break;
        default:
          console.log(selectedFormulaIndex);
          break;
      }
      output.textContent = +temp.toFixed(4); //the plus sign that drops any "extra" zeroes at the end.
    }
  };

  //выделенние во внешнем секторе
  const formulaChoose = function (choise) {
    elements.forEach((elem) => {
      if (elem.id !== choise) {
        elem.classList.remove("selected");
      } else if (!elem.classList.contains("selected")) {
        // console.log(elem.classList);
        elem.classList.add("selected");
      }
    });

    const letter1 = document.getElementById("value1Letter");
    const letter2 = document.getElementById("value2Letter");
    const letter3 = document.getElementById("outputLetter");


    //назначение букв для вводимых величин и результата
    switch (choise) {
      case "p1":
        letter1.textContent = "I";
        letter2.textContent = "R";
        letter3.textContent = "U";
        break;
      case "p2":
        letter1.textContent = "P";
        letter2.textContent = "I";
        letter3.textContent = "U";
        break;
      case "p3":
        letter1.textContent = "P";
        letter2.textContent = "R";
        letter3.textContent = "U";
        break;
      case "p4":
        letter1.textContent = "U";
        letter2.textContent = "I";
        letter3.textContent = "R";
        break;
      case "p5":
        letter1.textContent = "U";
        letter2.textContent = "P";
        letter3.textContent = "R";
        break;
      case "p6":
        letter1.textContent = "P";
        letter2.textContent = "I";
        letter3.textContent = "R";
        break;
      case "p7":
        letter1.textContent = "U";
        letter2.textContent = "R";
        letter3.textContent = "I";
        break;
      case "p8":
        letter1.textContent = "P";
        letter2.textContent = "U";
        letter3.textContent = "I";
        break;
      case "p9":
        letter1.textContent = "P";
        letter2.textContent = "R";
        letter3.textContent = "I";
        break;
      case "p10":
        letter1.textContent = "U";
        letter2.textContent = "I";
        letter3.textContent = "P";
        break;
      case "p11":
        letter1.textContent = "I";
        letter2.textContent = "R";
        letter3.textContent = "P";
        break;
      case "p12":
        letter1.textContent = "U";
        letter2.textContent = "R";
        letter3.textContent = "P";
        break;

      default:
        break;
    }

    //выделенние в центральном секторе
    center.forEach((elem) => {
      // console.log(letter3.textContent.toLowerCase());
      if (elem.classList.contains(letter3.textContent.toLowerCase())) {
        elem.classList.add("sel");
      } else if (elem.classList.contains("sel")) {
        elem.classList.remove("sel");
      }
    });
  };

  const init = function () {
    document.querySelector(".value1").addEventListener("input", () => {
      calculations();
    });
    document.querySelector(".value2").addEventListener("input", () => {
      calculations();
    });
  };
  init();
});
