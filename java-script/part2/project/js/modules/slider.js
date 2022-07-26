// import tabs from "./modules/tabs";
import {addZeroToNumbers, getNumbersOnly} from "./timer";
function slider({container, nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){

//############################################# слайдер картинок
function SliderNavigation(sliderNumber) {
  slidesField.style.transform = `translateX(-${
    sliderNumber * widthNum - widthNum
  }px)`;
  currentSlide.textContent = addZeroToNumbers(sliderNumber);

  //убираем у всех навигационных элементов  класс активности
  dots.forEach((elem) => {
    elem.classList.remove("dot-active");
  });
  //находим соответствующий навигационный элемент по data- аттрибуту и добавляем ему класс активности
  document
    .querySelector(`[data-number="${sliderNumber}"]`)
    .classList.add("dot-active");
  current = sliderNumber;
}
  // мое решение
  const prevSlide = document.querySelector(prevArrow),
    nextSlide = document.querySelector(nextArrow),
    currentSlide = document.querySelector(currentCounter),
    totalSlides = document.querySelector(totalCounter),
    sliderImages = document.querySelectorAll(container),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field);
  let widthPx = window.getComputedStyle(slidesWrapper).width; //ширина 1 слайда
  // const widthNum = Math.floor(widthPx.slice(0, widthPx.length - 2));
  // const widthNum = Math.floor(widthPx.replace(/\D/g,""));//заменяем не числа на ""
  const widthNum = Math.floor(getNumbersOnly(widthPx));
  widthPx = widthNum + "px";

  let current = 1;

  totalSlides.textContent = addZeroToNumbers(sliderImages.length);

  slidesField.style.width = 100 * sliderImages.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";
  sliderImages.forEach((slide) => {
    slide.style.width = widthPx;
  });
  nextSlide.addEventListener("click", function () {
    // + к offset добавляется ширина еще 1 слайда и вся линия слайдов будет смещаться на ширину 1 слайда ->
    if (current == sliderImages.length) {
      //width = "500px"
      current = 1;
    } else {
      current += 1;
    }

    SliderNavigation(current);
  });
  prevSlide.addEventListener("click", function () {
    // - от offset отнимается ширина еще 1 слайда и вся линия слайдов будет смещаться на ширину 1 слайда <-
    if (current == 1) {
      //width = "500px"
      current = sliderImages.length;
    } else {
      current -= 1;
    }
    SliderNavigation(current);
  });


  //############################################# навигация для слайдов
const sliderContainer = document.querySelector(".offer__slider"),
sliderIndicators = document.createElement("ol"),
dots = [];

sliderContainer.style.position = "relative";
sliderIndicators.classList.add("carousel-indicators");
sliderContainer.append(sliderIndicators);
//.dataset.imageNumber = i;

for (let i = 1; i <= sliderImages.length; i++) {
const dot = document.createElement("li");
dot.setAttribute("data-number", i);
dot.classList.add("dot");
sliderIndicators.append(dot);

dots.push(dot);
// sliderIndicators.innerHTML+= `
// <li class="dot" data-number="${i}"></li>
// `;
}

dots.forEach((dot) => {
dot.addEventListener("click", (e) => {
  const slideTo = e.target.getAttribute("data-number");

  SliderNavigation(parseInt(slideTo));
});
});
sliderIndicators.addEventListener("click", (event) => {
const target = event.target;
// console.log(target);
if (target.classList.contains("dot")) {
  SliderNavigation(parseInt(target.dataset.number)); //dataset - чтение data-* аттрибута    number из data-number
}
});

// console.log(allSliderIndicators);

SliderNavigation(1);

// prevSlide.addEventListener("click", function () {
//   // -
//   renderSliderImage(-1);
// });
// nextSlide.addEventListener("click", function () {
//   // +
//   renderSliderImage(1);
// });

// function renderSliderImage(number) {
//   current+=number;
//   if (current >= sliderImages.length) {
//     current = 0;
//   }
//   if (current < 0) {
//     current = sliderImages.length-1;
//   }

//   hideCollectionContent(sliderImages);
//   showCollectionContent(sliderImages, current);
//   currentSlide.textContent = addZeroToNumbers(current + 1);
// }

// renderSliderImage(0);
}
export default slider;
// export {SliderNavigation};
