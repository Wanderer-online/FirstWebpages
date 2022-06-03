const navButton = document.querySelector(".nav-button");
const mobileNav = document.querySelector(".mobile-nav");
const body = document.body;

//клик по кнопке
navButton.addEventListener("click", function (event) {
  event.stopPropagation();
  toogleMobileNav();
});
//клик по окну за пределами открытого меню
window.addEventListener("click", function () {
    // console.log('click on window');
  if (body.classList.contains("no-scroll")) {
    toogleMobileNav();
  }
});
//останавливаем клик внутри открытой мобильной навигации
mobileNav.addEventListener("click", function (event) {
  event.stopPropagation();
});

function toogleMobileNav() {
  mobileNav.classList.toggle("mobile-nav-active");
  navButton.classList.toggle("nav-button-close");
  body.classList.toggle("no-scroll");
}
