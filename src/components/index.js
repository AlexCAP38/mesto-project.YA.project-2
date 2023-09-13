import '../pages/index.css';
import { initialCards } from './array.js';
import { closePopup, openPopup } from './utils.js';
import { createCard } from './card.js';
import { enableValidation, isValid, toggleButtonState } from './validate.js';


//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
const profileEditButton = document.querySelector('.profile__edit-button');  //находим кнопку в доме
const popupEditprofile = document.querySelector('#edit-profile');           //находим попа "редактирования профиля" по id
const profileTitle = document.querySelector('.profile__title');             //находим элементы на страиницы чтобы их подставить
const profileSubtitle = document.querySelector('.profile__subtitle');       //в поля ввода в попапе
export const popupInputName = document.querySelector('#popup__input-name');        //находим input в модальном окне "ред.профиля"
export const popupInputAbout = document.querySelector('#popup__input-about');

getContent();

profileEditButton.addEventListener('click', function () {                   //отслеживаем событие по нажатию на кнопку "редактирования профиля"

  formElementEditProfile.reset();                                           //очищаем форму

  getContent();                                                             //обновляем контект каждый раз при открытие попапа

  const inputList = Array.from(popupEditprofile.querySelectorAll('.popup__input'));

  inputList.forEach(function (inputElement) {                                //обойдет все инпуты из массива
    isValid(inputElement, {formSelector: '.popup__form'});                   //Проверяет введенные данные на валидность
  });

  toggleButtonState(inputList, popupEditprofile, {submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_active'});//При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit

  openPopup(popupEditprofile);                                              //открываем попап

});

function getContent() {
  popupInputName.setAttribute('value', profileTitle.textContent);           //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
  popupInputAbout.setAttribute('value', profileSubtitle.textContent);
}


//БЛОК сохранения и отправка формы "редактирования профиля"
//===========================================================================================
const formElementEditProfile = document.querySelector('#popup__form-edit-profile');//ищем форму отправки попапа "редактирования профиля"
const nameInput = formElementEditProfile.querySelector('#popup__input-name');   //в ней ищем инпуты
const jobInput = formElementEditProfile.querySelector('#popup__input-about');

formElementEditProfile.addEventListener('submit', function formSubmitHandler(evt) {//отслеживаем событие нажатия кнопки сохранить
  evt.preventDefault();                                                         //пропускает собтыие сабмит и продолжает выполнть следующий код
  profileTitle.textContent = nameInput.value;                                   //присваивает элементам контена на страницы значение из поля ввода
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditprofile);                                                 //закрываем попап
});


//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================
const profileAddButton = document.querySelector('.profile__add-button');      //находим кнопку в доме
const popupNewCard = document.querySelector('#popup-new-card');               //находим форму для открятия

profileAddButton.addEventListener('click', function () {                      //Открытие попапа при нажатие на кнопку
  formNewcard.reset();                                                        //очищаем форму
  openPopup(popupNewCard);                                                    //открываем попап

});


//событие по нажатию на кнопку сохранить  и наполения контентом попапа для добавления новой карточки
//===========================================================================================
const formNewcard = document.querySelector('#popup__form-new-card');          //находим форму для добавления новых карточек
const nameCardInput = formNewcard.querySelector('#popup__input-name');        //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');

formNewcard.addEventListener('submit', function formSubmitHandler(evt) {      //событие при нажатие кнопки "сохранить"
  evt.preventDefault();                                                       //пропускает отправку и продолжает выполнть следующий код
  places.prepend(createCard(nameCardInput.value, urlInput.value));
  closePopup(popupNewCard);                                                   //закрываем попап
});


//БЛОК добавления на страницу n карточек название и ссылки берем из массива
//===========================================================================================
const places = document.querySelector('.places');

for (let i = 0; i < initialCards.length; i++) {                                 //Добавляем карточки из массива
  places.prepend(createCard(initialCards[i].name, initialCards[i].link));
}


//===========================================================================================
//Валидация инпутов, проверка на корректность ввода
//===========================================================================================
enableValidation({                                                              //Основная проверка
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_active',
  errorClass: 'popup__errorMessange_active',
  inputErrorClass: 'popup__input_error'
});
