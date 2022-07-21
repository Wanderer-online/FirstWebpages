function sliderNav(){

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
module.exports = sliderNav;
