//закрытие модального окна
const buttonClose = document.querySelector('.popup__close');

buttonClose.addEventListener('click', popupClose);

function popupClose() {
  popup.classList.remove('popup_opened');
}