import './pages/index.css';
import { initialCards } from './components/array.js';
import { closePopup, openPopup } from './components/utils.js';
import { enableValidation } from './components/validate.js';
import { createCard } from './components/card.js';


//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
const profileEditButton = document.querySelector('.profile__edit-button');  //находим кнопку в доме
const popupEditprofile = document.querySelector('#edit-profile'); //находим форму "редактирования профиля" в доме

const profileTitle = document.querySelector('.profile__title'); //находим элементы на страиницы чтобы их подставить
const profileSubtitle = document.querySelector('.profile__subtitle'); //в поля ввода в попапе

const popupInputName = document.querySelector('#popup__input-name');  // находим input в модальном окне "ред.профиля"
const popupInputAbout = document.querySelector('#popup__input-about');

popupInputName.setAttribute('value', profileTitle.textContent); //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
popupInputAbout.setAttribute('value', profileSubtitle.textContent);

//отслеживаем событие по нажатию на кнопку "редактирования профиля"
profileEditButton.addEventListener('click', function () {

  openPopup(popupEditprofile); //открываем попап

});

//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================

const profileAddButton = document.querySelector('.profile__add-button'); //находим кнопку в доме
const popupNewCard = document.querySelector('#popup-new-card'); //находим форму для открятия

profileAddButton.addEventListener('click', function () {  //Открытие попапа при нажатие на кнопку

  openPopup(popupNewCard); //открываем попап
  popupNewCard.querySelector('#popup__form-new-card').reset(); //очищаем форму

});


//событие по нажатию на кнопку сохранить  и наполения контентом попапа для добавления новой карточки
//===========================================================================================
const formNewcard = document.querySelector('#popup__form-new-card');  //находим форму для добавления новых карточек

const nameCardInput = formNewcard.querySelector('#popup__input-name');  //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');

formNewcard.addEventListener('submit', function formSubmitHandler(evt) {  //событие при нажатие кнопки "сохранить"

  evt.preventDefault();   //пропускает отправку и продолжает выполнть следующий код

  places.prepend(createCard(nameCardInput.value, urlInput.value));

  closePopup(popupNewCard);  //закрываем попап
});

//Блок закрытия модальных окон через нажатие кнопки "close"
//===========================================================================================
const buttonClose = document.querySelectorAll('.popup__close');

//перебираем массив
buttonClose.forEach((item) => {

  //навешиваем на текущий элемент слушатель
  item.addEventListener('click', function (event) {

    closePopup(event.target.closest('.popup'));

    //Если у кнопки родитель равен edit-profile тогда
    if (item.closest('.popup').id === "edit-profile" || item.closest('.popup').id === "popup-new-card") {

      //ищем в родители форму и сбрасываем ее
      event.target.closest('.popup').querySelector(".popup__form").reset();
    }
  });

});

//БЛОК сохранения и отправка формы "редактирования профиля"
//===========================================================================================

//ищем форму отправки попапа "редактирования профиля"
const formElement = document.querySelector('#popup__form');

//в ней ищем инпуты
const nameInput = formElement.querySelector('#popup__input-name');
const jobInput = formElement.querySelector('#popup__input-about');

//отслеживаем событие нажатия кнопки сохранить
formElement.addEventListener('submit', function formSubmitHandler(evt) {

  evt.preventDefault(); //пропускает собтыие сабмит и продолжает выполнть следующий код

  //присваивает элементам контена на страницы значение из поля ввода
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditprofile);  //закрываем попап
});

//БЛОК добавления на страницу n карточек название и ссылки берем из массива
//===========================================================================================

const places = document.querySelector('.places');

//Добавляем карточки из массива
for (let i = 0; i < initialCards.length; i++) {
  places.prepend(createCard(initialCards[i].name, initialCards[i].link));
}

//===========================================================================================
//Валидация инпутов, проверка на корректность ввода
//===========================================================================================

//Основная проверка
enableValidation();