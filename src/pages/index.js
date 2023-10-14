import '../pages/index.css';
import Popup from '../components/Popup.js';
import FormValidator from '../components/Formvalidator.js';
import Api from '../components/api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/Popupwithimage.js';
import PopupWithForm from '../components/Popupwithform.js';
import UserInfo from '../components/Userinfo.js';
import {
  templateCard,
  places,
  popupViewerContainer
} from '../utils/constants.js';

//БЛОК наполнение страницы
//===========================================================================================
export let userId = undefined;                                       //мой ID получит когда загрузит информацию о пользователе

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: 'bd02b005-4f65-48b7-9e39-fbb8e07fc766',
    'Content-Type': 'application/json'
  }
});

const card = new Card(templateCard, {
  deletelikeSRV: (placesLikeIcon) => { return api.deletelikeSRV(placesLikeIcon) },
  sendlikeSRV: (placesLikeIcon) => { return api.sendlikeSRV(placesLikeIcon) },
  handleCardClick: (url, name) => {

    const showImage = new PopupWithImage(popupViewerContainer);
    showImage.openPopup(url, name);
    //showImage(url, name)

  },
  deleteCard: (elmLikeIcon) => { deleteCard(elmLikeIcon) }
});


const userinfo = new UserInfo({                                         //объявляю класс аргументы объект из 2х селекторов
  title: document.querySelector('.profile__title'),
  subtitle: document.querySelector('.profile__subtitle'),
  getInfo: () => { return api.getUserProfile() },
  sendInfo: (name, about) => { return api.sendUserProfile(name, about) }
})


const section = new Section({ renderer: (element) => { return card.createCard(element) } }, places);

Promise.all([api.getUserProfile(), api.getCardsSRV()])
  .then(([infoUser, infoCards]) => {                                 //получаем ответы ввиде массивов
    profileTitle.textContent = infoUser.name;                        //присвоить имя из результат
    profileSubtitle.textContent = infoUser.about;                    //об пользователе
    profileAvatar.src = infoUser.avatar;                             //аватарка

    userId = infoUser._id;                                           //присвоили ID полученное от севера

    //console.log(userinfo.getUserInfo(infoUser));

    // infoCards.forEach(element => {                                   //обойдем массив карточек
    //   places.prepend(card.createCard(element));                           //добавит карточку на страницу
    // })
    section.renderer(infoCards);
    console.log(infoCards)
  })
  .catch((error) => {
    console.log('-->>   ' + error + '   <<-- ошибка в коде !!!');
  })




//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================

const profileEditButton = document.querySelector('.profile__edit-button');   //элемент кнопка
const popupEditprofile = document.querySelector('#edit-profile');            //элемент попап
const profileTitle = document.querySelector('.profile__title');       //элемент имя
const profileSubtitle = document.querySelector('.profile__subtitle'); //элемент субтайтл
const profileAvatar = document.querySelector('.profile__avatar');     //элемент картинка аватара
export const popupInputName = document.querySelector('#popup__input-name');  //поле ввода "имени" в модальном окне "ред.профиля"
export const popupInputAbout = document.querySelector('#popup__input-about');//поле ввода "о себе"  в модальном окне "ред.профиля"

profileEditButton.addEventListener('click', function () {                   //отслеживаем событие по нажатию на кнопку "редактирования профиля"
  const popup = new Popup(popupEditprofile);
  userinfo.getUserInfo();
  //getContent();                                                             //обновляем контект каждый раз при открытие попапа

  const inputList = Array.from(popupEditprofile.querySelectorAll('.popup__input'));

  inputList.forEach(function (inputElement) {                               //обойдет все инпуты из массива
    formValidator.isValid(inputElement, { formSelector: '.popup__form' });                //Проверяет введенные данные на валидность
  });

  //openPopup(popupEditprofile);                                              //открываем попап
  popup.openPopup();
});

// function getContent() {
//   popupInputName.value = profileTitle.textContent;                          //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
//   popupInputAbout.value = profileSubtitle.textContent;
// }


//БЛОК сохранения и отправка формы "редактирования профиля"
//===========================================================================================
const formElementEditProfile = document.querySelector('#popup__form-edit-profile'); //ищем форму отправки попапа "редактирования профиля"
const nameInput = formElementEditProfile.querySelector('#popup__input-name');       //в ней ищем инпуты
const jobInput = formElementEditProfile.querySelector('#popup__input-about');

const popup = new Popup(popupEditprofile);
const popupwithprofile = new PopupWithForm(popupEditprofile);



formElementEditProfile.addEventListener('submit', function formSubmitHandler(evt) { //отслеживаем событие нажатия кнопки сохранить
  evt.preventDefault();                                                             //пропускает собтыие сабмит и продолжает выполнть следующий код
  popupwithprofile._getInputValues()

  formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранение...'; //типа прогресс бар при нажантие на кнопку меняем название кнопки


  userinfo.setUserInfo(nameInput.value, jobInput.value);


  // api.sendUserProfile(nameInput.value, jobInput.value)                                  //отправка информации о пользователе на сервер
  //   .then((result) => {
  //     profileTitle.textContent = result.name;                                       //присваивает элементам на страницы значение из ответа сервера
  //     profileSubtitle.textContent = result.about;

  //     //closePopup(popupEditprofile);                                                 //закрываем попап
  //     popup.closePopup(popupEditprofile);
  //   })
  //   .catch((error) => {
  //     console.log('Ошибка: ' + error);
  //   })
  //   .finally(() => {
  //     formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранить'; //при любом исходе промиса возрашаем название кнопки
  //   })
  popup.closePopup(popupEditprofile);
});

//БЛОК Обновление аватарки на сервере
//===========================================================================================
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');    //элемент кнопка обновления аватарки
const popupEditAvatar = document.querySelector('#popup-edit-avatar');        //элемент попап
const formEditAvatar = document.querySelector('#popup__form-edit-avatar');   //элемент форма

buttonEditAvatar.addEventListener('click', () => {
  const popup = new Popup(popupEditAvatar);
  popupEditAvatar.querySelector('.popup__button').disabled = true;               //отключим кнопку т.к. поля не валидны
  popupEditAvatar.querySelector('.popup__button').classList.add('popup__button_active');

  formEditAvatar.reset();
  //openPopup(popupEditAvatar);
  popup.openPopup();
});

formEditAvatar.addEventListener('submit', (evt) => {
  const popup = new Popup(popupEditAvatar);

  evt.preventDefault();                                                         //пропускает собтыие сабмит и продолжает выполнть следующий код
  formEditAvatar.querySelector('button').textContent = 'Сохранение...';

  const inputEditAvatar = formEditAvatar.querySelector('input');                //элемент полле ввода
  api.sendAvatar(inputEditAvatar)
    .then((resourse) => {
      document.querySelector('.profile__avatar').src = inputEditAvatar.value;
      //closePopup(popupEditAvatar);                                              //закрываем попап
      popup.closePopup();
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
  const popup = new Popup(popupNewCard);
  popupNewCard.querySelector('.popup__button').disabled = true;               //отключим кнопку т.к. поля не валидны
  popupNewCard.querySelector('.popup__button').classList.add('popup__button_active');

  formNewcard.reset();                                                        //очищаем форму

  //openPopup(popupNewCard);                                                    //открываем попап
  popup.openPopup();
});


//событие по нажатию на кнопку сохранить и добавления новой карточки
//===========================================================================================
const formNewcard = document.querySelector('#popup__form-new-card');          //находим форму для добавления новых карточек
const nameCardInput = formNewcard.querySelector('#popup__input-name');        //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');

formNewcard.addEventListener('submit', function formSubmitHandler(evt) {      //событие при нажатие кнопки "сохранить"
  evt.preventDefault();                                                       //пропускает отправку и продолжает выполнть следующий код

  const popup = new Popup(popupNewCard);
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';

  api.sendCardsSRV(nameCardInput.value, urlInput.value)                       //отправит информацию на сревер
    .then((result) => {

      section.renderer([result]);
      //places.prepend(card.createCard(result));                   //ответ сервера и шаблон для создания карточки закидываем в метод добваления новой карточки
      //closePopup(popupNewCard);                                               //закрываем попап
      popup.closePopup();
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

const deleteCard = (trashLikeIcon) => {
  const popup = new Popup(popupConfirmDelete);
  popup.openPopup();                                                //откроет попап
  return deletingCard = trashLikeIcon.closest('div')
}

popupConfirmDelete.querySelector('#popup__form-confirm-delete-card')                //найтдет форму в попапе
  .addEventListener('submit', (event) => {                                            //событие на сабмит формы
    const popup = new Popup(popupConfirmDelete);
    event.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код

    api.deleteCardsSRV(deletingCard.id)                                                   //отправит запрос на удаление карточик
      .then(() => {
        deletingCard.remove();                                                        //при нажатие на икону найти родителя по тегу и удалить его
        //closePopup(popupConfirmDelete);                                               //закрываем попап
        popup.closePopup();
      })
      .catch((error) => {
        console.log('Ошибка удаления карточки: ' + error);
      });
  });




const formValidator = new FormValidator({                                                              //Основная проверка
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_active',
  errorClass: 'popup__errorMessange_active',
  inputErrorClass: 'popup__input_error'
});

formValidator.enableValidation();                                                                   //Валидация инпутов, проверка на корректность ввода
















// const showImage = (url, name) => {


//   const popupViewerImage = popupViewerContainer.querySelector('.popup__image');//в этой форме ищем элемент для картинки
//   const popupViewerTitle = popupViewerContainer.querySelector('.popup__title');// в тойже форме ище элемент для наименование

//   popupViewerImage.setAttribute('src', url);                                 //присваиваем урл атрибут
//   popupViewerImage.setAttribute('alt', 'Изображение ' + name);

//   popupViewerTitle.textContent = name;                                       //присваиваем название изображения
//   const popup = new Popup(popupViewerContainer);
//   popup.openPopup();
// }