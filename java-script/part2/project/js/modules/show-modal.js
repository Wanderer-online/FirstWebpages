function showModal(){

//############################################# показ модального окна (modal__content)

function showThanksModal(message) {
    const originalDialog = document.querySelector(".modal__content");
    console.log(originalDialog);
    originalDialog.classList.add("hide");
    openModal();

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
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}
module.exports = showModal;
