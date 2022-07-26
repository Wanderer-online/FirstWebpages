function calc(){
//############################################# калькулятор каллорий

const calcResult = document.querySelector(".calculating__result span"); //span внутри искомого элемента
let sex, height, weight, age, activity;

if (localStorage.getItem("sex")) {
  sex = localStorage.getItem("sex");
} else {
  sex = "female";
  localStorage.setItem("sex", sex);
}
if (localStorage.getItem("activity")) {
  activity = localStorage.getItem("activity");
} else {
  activity = 1.375;
  localStorage.setItem("activity", activity);
}
if (localStorage.getItem("height")) {
  height = localStorage.getItem("height");
  document.querySelector("#height").value = height;
}
if (localStorage.getItem("weight")) {
  weight = localStorage.getItem("weight");
  document.querySelector("#weight").value = weight;
}
if (localStorage.getItem("age")) {
  age = localStorage.getItem("age");
  document.querySelector("#age").value = age;
}

function initCalcLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((elem) => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute("id") === localStorage.getItem("sex")) {
      elem.classList.add(activeClass);
    }
    if (
      elem.getAttribute("data-activity") === localStorage.getItem("activity")
    ) {
      elem.classList.add(activeClass);
    }
  });
}
initCalcLocalSettings("#gender div", "calculating__choose-item_active");
initCalcLocalSettings(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function calcCalories() {
  if (!sex || !height || !weight || !age || !activity) {
    calcResult.textContent = "0.0";
    return;
  }
  if (sex === "female") {
    calcResult.textContent = (
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) *
      activity
    ).toFixed(2);
  } else {
    calcResult.textContent = (
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) *
      activity
    ).toFixed(2);
  }
}
calcCalories();

function getCalcStaticData(Selector, activeClass) {
  const allElements = document.querySelectorAll(`${Selector}`); //получить все div внутри родителя

  // document.querySelector(parentSelector).addEventListener("click", (e) => {
  // if (e.target.classList.contains("calculating__choose-item")) {//убедимся что кликаем именно по кнопке, а не родителю

  allElements.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      //есть 2 ряда кнопок - 1 с id, 2 с data-activity="число"
      if (e.target.getAttribute("data-activity")) {
        activity = +e.target.getAttribute("data-activity");
        localStorage.setItem("activity", activity);
      } else {
        sex = e.target.getAttribute("id");
        localStorage.setItem("sex", sex);
      }

      allElements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });
      e.target.classList.add(activeClass);

      calcCalories();
    });
  });
}

getCalcStaticData("#gender div", "calculating__choose-item_active");
getCalcStaticData(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function getCalcDynamicData(selector) {
  const input = document.querySelector(selector);
  input.addEventListener("input", () => {
    if (input.value.match(/\D/g)) {
      input.style.border = "1px solid red";
    } else {
      input.style.border = "none";
    }

    switch (input.getAttribute("id")) {
      case "height":
        height = +input.value;
        localStorage.setItem("height", height);
        break;
      case "weight":
        weight = +input.value;
        localStorage.setItem("weight", weight);
        break;
      case "age":
        age = +input.value;
        localStorage.setItem("age", age);
        break;
    }
    // console.log(height,weight,age);
    calcCalories();
  });
}

getCalcDynamicData("#height");
getCalcDynamicData("#weight");
getCalcDynamicData("#age");
}
export default calc;
