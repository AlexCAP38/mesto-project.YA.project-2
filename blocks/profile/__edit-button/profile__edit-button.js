//Открыие модального окна

//находим элементы в доме
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

//слушаем событие
profileEditButton.addEventListener('click', popupOpened);

//действие при событие
function popupOpened() {

  //условие читаем сласс если там нету такого имени, добавим его. модальное окно откроется
  if (popup.classList.contains('popup_opened') !== true) {
    popup.classList.toggle('popup_opened');

    //подставляем в поля ввода даный из title и subtitle
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    const popupInputName = document.querySelector('#popup__input-name');
    const popupInputAbout = document.querySelector('#popup__input-about');

    //создаем атрибут валуе присваиваем туда значение из контекста на странице
    popupInputName.setAttribute('value', profileTitle.textContent);
    popupInputAbout.setAttribute('value', profileSubtitle.textContent);
  }
}
