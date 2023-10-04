import '../pages/index.css';
import { closePopup, openPopup } from './modal.js';
import { createCard } from './card.js';
import { enableValidation, isValid } from './validate.js';
import { getUserProfile, getCardsSRV, sendUserProfile, sendCardsSRV, deleteCardsSRV, sendAvatar, config } from './api.js';

//БЛОК наполнение страницы
//===========================================================================================
export let userId = undefined;                                       //мой ID получит когда загрузит информацию о пользователе

Promise.all([getUserProfile(), getCardsSRV()])
  .then(([infoUser, infoCards]) => {
    profileTitle.textContent = infoUser.name;                        //присвоить имя из результат
    profileSubtitle.textContent = infoUser.about;                    //об пользователе
    profileAvatar.src = infoUser.avatar;                             //аватарка

    userId = infoUser._id;                                           //присвоили ID полученное от севера

    infoCards.forEach(element => {                                   //обойдем массив карточек
      places.prepend(createCard(element));                           //добавит карточку на страницу
    })
  })
  .catch((error) => {
    console.log(error + ' что-то пошло не так =(');
  })

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================

const profileEditButton = document.querySelector('.profile__edit-button');   //элемент кнопка
const popupEditprofile = document.querySelector('#edit-profile');            //элемент попап
const profileTitle = document.querySelector('.profile__title');       //элемент имя
const profileSubtitle = document.querySelector('.profile__subtitle'); //элемент субимя
const profileAvatar = document.querySelector('.profile__avatar');     //элемент картинка аватара
export const popupInputName = document.querySelector('#popup__input-name');  //поле ввода "имени" в модальном окне "ред.профиля"
export const popupInputAbout = document.querySelector('#popup__input-about');//поле ввода "о себе"  в модальном окне "ред.профиля"

profileEditButton.addEventListener('click', function () {                   //отслеживаем событие по нажатию на кнопку "редактирования профиля"
  getContent();                                                             //обновляем контект каждый раз при открытие попапа

  const inputList = Array.from(popupEditprofile.querySelectorAll('.popup__input'));

  inputList.forEach(function (inputElement) {                               //обойдет все инпуты из массива
    isValid(inputElement, { formSelector: '.popup__form' });                //Проверяет введенные данные на валидность
  });

  openPopup(popupEditprofile);                                              //открываем попап
});

function getContent() {
  popupInputName.value = profileTitle.textContent;                          //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
  popupInputAbout.value = profileSubtitle.textContent;
}


//БЛОК сохранения и отправка формы "редактирования профиля"
//===========================================================================================
const formElementEditProfile = document.querySelector('#popup__form-edit-profile'); //ищем форму отправки попапа "редактирования профиля"
const nameInput = formElementEditProfile.querySelector('#popup__input-name');       //в ней ищем инпуты
const jobInput = formElementEditProfile.querySelector('#popup__input-about');

formElementEditProfile.addEventListener('submit', function formSubmitHandler(evt) { //отслеживаем событие нажатия кнопки сохранить
  evt.preventDefault();                                                             //пропускает собтыие сабмит и продолжает выполнть следующий код

  formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранение...'; //типа прогресс бар при нажантие на кнопку меняем название кнопки

  sendUserProfile(nameInput.value, jobInput.value)                                  //отправка информации о пользователе на сервер
    .then((result) => {
      profileTitle.textContent = result.name;                                       //присваивает элементам на страницы значение из ответа сервера
      profileSubtitle.textContent = result.about;

      closePopup(popupEditprofile);                                                 //закрываем попап
    })
    .catch((error) => {
      console.log('Ошибка: ' + error);
    })
    .finally(() => {
      formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранить'; //при любом исходе промиса возрашаем название кнопки
    })
});

//БЛОК Обновление аватарки на сервере
//===========================================================================================
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');    //элемент кнопка обновления аватарки
const popupEditAvatar = document.querySelector('#popup-edit-avatar');        //элемент попап
const formEditAvatar = document.querySelector('#popup__form-edit-avatar');   //элемент форма

buttonEditAvatar.addEventListener('click', () => {

  popupEditAvatar.querySelector('.popup__button').disabled = true;               //отключим кнопку т.к. поля не валидны
  popupEditAvatar.querySelector('.popup__button').classList.add('popup__button_active');

  formEditAvatar.reset();
  openPopup(popupEditAvatar);
});

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();                                                         //пропускает собтыие сабмит и продолжает выполнть следующий код
  formEditAvatar.querySelector('button').textContent = 'Сохранение...';

  const inputEditAvatar = formEditAvatar.querySelector('input');                //элемент полле ввода
  sendAvatar(inputEditAvatar)
    .then((resourse) => {
      document.querySelector('.profile__avatar').src = inputEditAvatar.value;
      closePopup(popupEditAvatar);                                              //закрываем попап
    })
    .catch((error) => {
      console.log('Ошибка отправки: ' + error);
    })
    .finally(() => {
      setTimeout(delay => formEditAvatar.querySelector('button').textContent = 'Сохранить', 3000) //пауза для того чтоб название появлялось после закрытия попап
    })
});


//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================
const profileAddButton = document.querySelector('.profile__add-button');      //находим кнопку в доме
const popupNewCard = document.querySelector('#popup-new-card');               //находим форму для открятия

profileAddButton.addEventListener('click', function () {                      //Открытие попапа при нажатие на кнопку

  popupNewCard.querySelector('.popup__button').disabled = true;               //отключим кнопку т.к. поля не валидны
  popupNewCard.querySelector('.popup__button').classList.add('popup__button_active');

  formNewcard.reset();                                                        //очищаем форму

  openPopup(popupNewCard);                                                    //открываем попап
});


//событие по нажатию на кнопку сохранить и добавления новой карточки
//===========================================================================================
const formNewcard = document.querySelector('#popup__form-new-card');          //находим форму для добавления новых карточек
const nameCardInput = formNewcard.querySelector('#popup__input-name');        //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');
export const places = document.querySelector('.places');                      //найти элемент "блок места"

formNewcard.addEventListener('submit', function formSubmitHandler(evt) {      //событие при нажатие кнопки "сохранить"
  evt.preventDefault();                                                       //пропускает отправку и продолжает выполнть следующий код
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
  sendCardsSRV(nameCardInput.value, urlInput.value)                           //отправит информацию на сревер
    .then((result) => {
      places.prepend(createCard(result));                                     //ответ сервера закидываем в фиункцию добваления новой карточки
      closePopup(popupNewCard);                                               //закрываем попап
    })
    .catch((error) => {
      console.log('Ошибка отправки: ' + error);
    })
    .finally(() => {
      setTimeout(delay => evt.target.querySelector('.popup__button').textContent = 'Сохранить', 3000);  //пауза для того чтоб название появлялось после закрытия попап
    })
});

//===========================================================================================
//Блок подтверждения удаления карточки
//===========================================================================================
const popupConfirmDelete = document.querySelector('#popup-confirm-delete-card');    //найдет попап
let deletingCard = undefined;

export const deleteCard = (trashLikeIcon) => {
  openPopup(popupConfirmDelete);                                                        //откроет попап
  return deletingCard = trashLikeIcon.closest('div')
}

popupConfirmDelete.querySelector('#popup__form-confirm-delete-card')                //найтдет форму в попапе
  .addEventListener('submit', (event) => {                                            //событие на сабмит формы

    event.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код

    deleteCardsSRV(deletingCard.id)                                                   //отправит запрос на удаление карточик
      .then(() => {
        deletingCard.remove();                                                        //при нажатие на икону найти родителя по тегу и удалить его
        closePopup(popupConfirmDelete);                                               //закрываем попап
      })
      .catch((error) => {
        console.log('Ошибка удаления карточки: ' + error);
      });
  });




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