import '../pages/index.css';
import { closePopup, openPopup } from './utils.js';
import { createCard } from './card.js';
import { enableValidation, isValid, toggleButtonState } from './validate.js';
import { getUserProfile, getCardsSRV, sendUserProfile, sendCardsSRV, deleteCardsSRV, sendAvatar, config } from './api.js';

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
getUserProfile(config);                                              //Загрузка данных с сервера

const profileEditButton = document.querySelector('.profile__edit-button');   //элемент кнопка
const popupEditprofile = document.querySelector('#edit-profile');            //элемент попап
export const profileTitle = document.querySelector('.profile__title');       //элемент имя
export const profileSubtitle = document.querySelector('.profile__subtitle'); //элемент субимя
export const profileAvatar = document.querySelector('.profile__avatar');     //элемент картинка аватара
export const popupInputName = document.querySelector('#popup__input-name');  //поле ввода "имени" в модальном окне "ред.профиля"
export const popupInputAbout = document.querySelector('#popup__input-about');//поле ввода "о себе"  в модальном окне "ред.профиля"

getContent();

profileEditButton.addEventListener('click', function () {                   //отслеживаем событие по нажатию на кнопку "редактирования профиля"
  formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранить';
  formElementEditProfile.reset();                                           //очищаем форму

  getContent();                                                             //обновляем контект каждый раз при открытие попапа

  const inputList = Array.from(popupEditprofile.querySelectorAll('.popup__input'));
  inputList.forEach(function (inputElement) {                               //обойдет все инпуты из массива
    isValid(inputElement, { formSelector: '.popup__form' });                //Проверяет введенные данные на валидность
  });
  toggleButtonState(inputList, popupEditprofile, { submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_active' });//При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit
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
  formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';
  profileTitle.textContent = nameInput.value;                                   //присваивает элементам контена на страницы значение из поля ввода
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditprofile);                                                 //закрываем попап
  sendUserProfile(config, nameInput.value, jobInput.value);
});

//БЛОК Обновление аватарки на сервере
//===========================================================================================
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');    //элемент кнопка обновления аватарки
const popupEditAvatar = document.querySelector('#popup-edit-avatar');        //элемент попап
const formEditAvatar = document.querySelector('#popup__form-edit-avatar');   //элемент форма

buttonEditAvatar.addEventListener('click', () => {
  formEditAvatar.querySelector('button').textContent = 'Сохранить';
  formEditAvatar.reset();
  openPopup(popupEditAvatar);
});


formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();                                                         //пропускает собтыие сабмит и продолжает выполнть следующий код
  formEditAvatar.querySelector('button').textContent = 'Сохранение...';
  const inputEditAvatar = formEditAvatar.querySelector('input');                      //элемент полле ввода
  sendAvatar(config, inputEditAvatar, popupEditAvatar);
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

  const newCardLikes = {                                                      //Шаблон для заполнения новой карточки
    name: nameCardInput.value,
    link: urlInput.value,
    likes: 0,
    owner: {
      _id: config.myId
    },
    _id: '66666666666666666'
  };

  places.prepend(createCard(newCardLikes));            //добавит карточку в ДОМ
  sendCardsSRV(config, nameCardInput.value, urlInput.value);         //отправит информацию на сревер
  closePopup(popupNewCard);                                                   //закрываем попап
});


//БЛОК добавления на страницу карточек название и ссылки берем из массива
//===========================================================================================
export const places = document.querySelector('.places');                               //найти элемент "блок места"

getCardsSRV(config);

export const getCardsArray = (arrayCards) => {
  for (let i = 0; i < arrayCards.length; i++) {                                 //Повторяем по длинне массива
    places.prepend(createCard(arrayCards[i].name, arrayCards[i].link));       //Добавляем карточку
  }
}

//===========================================================================================
//Блок подтверждения удаления карточки
//===========================================================================================

export const deleteCard = (trashLikeIcon) => {
  const popupConfirmDelete = document.querySelector('#popup-confirm-delete-card');      //найдет попап
  openPopup(popupConfirmDelete);                                                        //откроет попап

  popupConfirmDelete.querySelector('#popup__form-confirm-delete-card')                  //найтдет форму в попапе
    .addEventListener('submit', (event) => {                                            //событие на сабмит формы
      event.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код
      deleteCardsSRV(config, trashLikeIcon.closest('div').id);                                                                 //отправит запрос на удаление карточик
      trashLikeIcon.closest('div').remove();                                            //при нажатие на икону найти родителя по тегу и удалить его
      closePopup(popupConfirmDelete);                                                   //закрываем попап
    });
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