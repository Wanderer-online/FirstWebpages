function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  //modalWindow.classList.toggle("show");
  document.body.style.overflow = ""; //scroll выставится по умолчанию
}
function openModal(modalSelector, modalTimerID) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  //modalWindow.classList.toggle("show");
  document.body.style.overflow = "hidden";
  console.log(modalTimerID);
  if (modalTimerID){
  clearInterval(modalTimerID);}

}
function modal(triggerSelector, modalSelector,modalTimerID) {
  //############################################# modal window "связаться с нами"
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);



  modalTrigger.forEach((elem) => {
    elem.addEventListener("click", () => {
      openModal(modalSelector,modalTimerID);
    });
  });



  //закрываем модальное окно если клик вне пределов его содержимого
  //modalWindow = это контейнер для modal__dialog. если клик внутри modalWindow и только по нему - закрыть, если где-то еще (по самому телу диалога) - ничего не делать
  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  //коды можно нагуглить или посмотреть на сайте keycode.info
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });


  function showModalByScroll() {
    //прокрутка страницы вниз + видимая высота окна >= общая высота документа (пролистано до самого конца)
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector,modalTimerID);
      window.removeEventListener("scroll", showModalByScroll); //удалить обработчик можно и так - точно повторив то, что было назначено в его объявлении
      clearInterval(modalTimerID);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
export default modal;
export {closeModal};
export {openModal};
