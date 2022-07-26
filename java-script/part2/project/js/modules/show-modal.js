import { openModal,closeModal } from "./modal";

//############################################# показ модального окна (modal__content)
function showThanksModal(message,modalTimerID) {
  const originalDialog = document.querySelector(".modal__content");
  console.log(originalDialog);
  originalDialog.classList.add("hide");
  openModal(".modal",modalTimerID);

  const ThanksModal = document.createElement("div");
  ThanksModal.classList.add("modal__content");
  ThanksModal.innerHTML = `
    <div class="modal__close" data-close>×</div>
    <div class="modal__title">${message}</div>
  `;

  document.querySelector(".modal__dialog").append(ThanksModal);
  setTimeout(() => {
    ThanksModal.remove();
    originalDialog.classList.add("show");
    originalDialog.classList.remove("hide");
    closeModal(".modal");
  }, 4000);
}


function showModal(){


  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}
export default showModal;
export {showThanksModal};
