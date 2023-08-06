//БЛОК модальное окно "редактирования профиля"

const profileEditButton = document.querySelector('.profile__edit-button');  //находим кнопку в доме
const popupEditprofile = document.querySelector('#edit-profile'); //находим форму "редактирования профиля" в доме

const profileTitle = document.querySelector('.profile__title'); //находим элементы на страиницы чтобы их подставить
const profileSubtitle = document.querySelector('.profile__subtitle'); //в поля ввода в попапе

const popupInputName = document.querySelector('#popup__input-name');  // находим инпуты для текущего модального окна
const popupInputAbout = document.querySelector('#popup__input-about');



//отслеживаем событие по клику, создаем функцию
profileEditButton.addEventListener('click', function () {

  popupEditprofile.classList.remove('popup__close_animation'); //удаляем анимацией для закрытиея попапа
  popupEditprofile.classList.add('popup_opened'); //открываем попап для редактирования профиля

  //устанавливаем атрибут валуе присваиваем туда значение из контекста страницы
  popupInputName.setAttribute('value', profileTitle.textContent);
  popupInputAbout.setAttribute('value', profileSubtitle.textContent);

});