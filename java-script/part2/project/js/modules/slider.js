function slider(){

//############################################# слайдер картинок
  // мое решение
  const prevSlide = document.querySelector(".offer__slider-prev"),
    nextSlide = document.querySelector(".offer__slider-next"),
    currentSlide = document.querySelector("#current"),
    totalSlides = document.querySelector("#total"),
    sliderImages = document.querySelectorAll(".offer__slide"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner");
  let widthPx = window.getComputedStyle(slidesWrapper).width; //ширина 1 слайда
  //без округления херня получается
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
}
module.exports=slider;
