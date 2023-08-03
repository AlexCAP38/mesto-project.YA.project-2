const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', addNewplaced);

function addNewplaced() {

  if (popup[1].classList.contains('popup_opened') !== true) {
    popup[1].classList.toggle('popup_opened');

    // //подставляем в поля ввода даный из title и subtitle
    // const profileTitle = document.querySelector('.profile__title');
    // const profileSubtitle = document.querySelector('.profile__subtitle');

    // const popupInputName = document.querySelector('#popup__input-name');
    // const popupInputAbout = document.querySelector('#popup__input-about');

    // //создаем атрибут валуе присваиваем туда значение из контекста на странице
    // popupInputName.setAttribute('value', profileTitle.textContent);
    // popupInputAbout.setAttribute('value', profileSubtitle.textContent);
  }



}