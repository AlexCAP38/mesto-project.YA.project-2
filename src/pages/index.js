import '../pages/index.css';
import Popup from '../components/Popup.js';
import FormValidator from '../components/Formvalidator.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/Userinfo.js';
import {
  templateCard,
  places,
  popupViewerContainer
} from '../utils/constants.js';

//БЛОК Создание Экземпляров
//===========================================================================================
export let userId = undefined;                                       //мой ID получит когда загрузит информацию о пользователе

const useApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: 'bd02b005-4f65-48b7-9e39-fbb8e07fc766',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({                                         //объявляю класс аргументы объект из 2х селекторов
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
})

Promise.all([useApi.getUserProfile(), useApi.getCardsSRV()])
  .then(([infoUser, infoCards]) => {                                 //получаем ответы ввиде массивов
    userInfo.setUserInfo(infoUser);
    section.renderer(infoCards);
  })
  .catch((error) => {
    console.log('-->>   ' + error + '   <<-- ошибка в коде !!!');
  })


const createCard = new Card(templateCard, {
  deletelikeSRV: (placesLikeIcon) => { return useApi.deletelikeSRV(placesLikeIcon) },
  sendlikeSRV: (placesLikeIcon) => { return useApi.sendlikeSRV(placesLikeIcon) },
  handleCardClick: (url, name) => { showImage.open(url, name) },
  deleteCard: (evnetClickIcon) => {
    popupConfirmDelete._cbApi(evnetClickIcon)
    popupConfirmDelete.openPopup(); popupConfirmDelete.setEventListeners();
  }
});

const showImage = new PopupWithImage('#popup-viewer');                                //Создаем экземпляр для отображения картинок
showImage.setEventListeners();


const section = new Section({ renderer: (element) => { return createCard.createCard(element) } }, places);

const formValidator = new FormValidator({                                                              //Основная проверка
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_active',
  errorClass: 'popup__errorMessange_active',
  inputErrorClass: 'popup__input_error'
});

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
// const profileAvatar = document.querySelector('.profile__avatar');                                       //элемент картинка аватара

const popupWithFormUserProfile = new PopupWithForm('#edit-profile',
  {
    cbApi: (data) => {
      //БЛОК сохранения и отправка формы "редактирования профиля"
      //===========================================================================================
      const formElementEditProfile = document.forms['popup__form-edit-profile'];                             //ищем форму отправки попапа "редактирования профиля"
      const nameInput = formElementEditProfile.querySelector('#popup__input-name');                           //в ней ищем инпуты
      const jobInput = formElementEditProfile.querySelector('#popup__input-about');

      const profileTitle = document.querySelector('.profile__title');                                         //элемент имя
      const profileSubtitle = document.querySelector('.profile__subtitle');                                   //элемент субтайтл

      formElementEditProfile.addEventListener('submit', function formSubmitHandler(evt) { //отслеживаем событие нажатия кнопки сохранить
        evt.preventDefault();                                                             //пропускает собтыие сабмит и продолжает выполнть следующий код

        formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранение...'; //типа прогресс бар при нажантие на кнопку меняем название кнопки

        useApi.sendUserProfile(nameInput.value, jobInput.value)
          .finally(() => {
            profileTitle.textContent = nameInput.value;
            profileSubtitle.textContent = jobInput.value;
            popupWithFormUserProfile.closePopup();
          });
      });
    }
  });


const profileEditButton = document.querySelector('.profile__edit-button');                              //элемент кнопка
profileEditButton.addEventListener('click', () => {                                                     //событие по нажатию на кнопку "редактирования профиля"
  formValidator.enableValidation('#edit-profile');                                                     //Валидация инпутов, проверка на корректность ввода

  popupWithFormUserProfile.setEventListeners();                                                         //Событие на закрытие окна (клик на всю форму модального окна)

  const popupInputName = document.querySelector('#popup__input-name');                             //поле ввода "имени" в модальном окне "ред.профиля"
  const popupInputAbout = document.querySelector('#popup__input-about');                           //поле ввода "о себе"  в модальном окне "ред.профиля"
  popupInputName.value = userInfo.getUserInfo().name;                                                 //обновляем контект каждый раз при открытие попапа
  popupInputAbout.value = userInfo.getUserInfo().about;

  popupWithFormUserProfile.openPopup();
});


//БЛОК Обновление аватарки на сервере
//===========================================================================================
const formEditAvatar = document.forms['popup__form-edit-avatar'];           //элемент форма
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');    //элемент кнопка обновления аватарки
const popupEditAvatar = document.querySelector('#popup-edit-avatar');        //элемент попап
const btnEditAvatar = formEditAvatar.querySelector('button');

const popupWithFormEditAvatar = new PopupWithForm('#popup-edit-avatar', {
  cbApi: () => {

    formEditAvatar.addEventListener('submit', (evt) => {
      evt.preventDefault();                                                         //пропускает собтыие сабмит и продолжает выполнть следующий код

      btnEditAvatar.textContent = 'Сохранение...';
      const inputEditAvatar = formEditAvatar.querySelector('input');                //элемент полле ввода

      useApi.sendAvatar(inputEditAvatar)
        .then((resourse) => {
          document.querySelector('.profile__avatar').src = inputEditAvatar.value;
          popupWithFormEditAvatar.closePopup();                                     //закрываем попап
        })
        .catch((error) => {
          console.log('Ошибка отправки: ' + error);
        })
        .finally(() => {
          btnEditAvatar.textContent = 'Сохранить';
        })
    });
  }
});

buttonEditAvatar.addEventListener('click', () => {
  formValidator.enableValidation('#popup__form-edit-avatar');
  popupWithFormEditAvatar.openPopup();
  popupWithFormEditAvatar.setEventListeners();
});

//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================
const popupWithFormNewCard = new PopupWithForm('#popup-new-card',
  {
    cbApi: () => {

      //событие по нажатию на кнопку сохранить и добавления новой карточки
      //===========================================================================================
      const formNewcard = document.forms['popup__form-new-card'];          //находим форму для добавления новых карточек
      const nameCardInput = formNewcard.querySelector('#popup__input-name');        //в форме ищем инпуты куда будут вводить имя карточки и url
      const urlInput = formNewcard.querySelector('#popup__input-link');

      formNewcard.addEventListener('submit', function formSubmitHandler(evt) {      //событие при нажатие кнопки "сохранить"
        evt.preventDefault();                                                       //пропускает отправку и продолжает выполнть следующий код

        evt.target.querySelector('.popup__button').textContent = 'Сохранение...';

        useApi.sendCardsSRV(nameCardInput.value, urlInput.value)                       //отправит информацию на сревер
          .then((result) => {

            section.renderer([result]);
            popupWithFormNewCard.closePopup();                                                         //закрываем попап
          })
          .catch((error) => {
            console.log('Ошибка отправки: ' + error);
          })
          .finally(() => {
            evt.target.querySelector('.popup__button').textContent = 'Сохранить'
          })
      });

    }
  });


  const profileAddButton = document.querySelector('.profile__add-button');      //находим кнопку в доме
  profileAddButton.addEventListener('click', () => {                      //Открытие попапа при нажатие на кнопку
    // popupNewCard.querySelector('.popup__button').disabled = true;               //отключим кнопку т.к. поля не валидны
  // popupNewCard.querySelector('.popup__button').classList.add('popup__button_active');
  popupWithFormNewCard.setEventListeners();
  formValidator.enableValidation('#popup-new-card');
  popupWithFormNewCard.openPopup();                                           //открываем попап
});

//===========================================================================================
//Блок подтверждения удаления карточки
//===========================================================================================

const formConfirmDelete = document.querySelector('#popup-confirm-delete-card');   //элемент попап
const btnConfirmDelete = document.forms['popup__form-confirm-delete-card'];                            //найтдет форму

const popupConfirmDelete = new PopupWithForm('#popup-confirm-delete-card', {
  cbApi: (evnetClickIcon) => {
    btnConfirmDelete.addEventListener('submit', (event) => {                                            //событие на сабмит формы
      event.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код
      useApi.deleteCardsSRV(evnetClickIcon.target.closest('.places__card').id)                                                   //отправит запрос на удаление карточик
        .then(() => {

          evnetClickIcon.target.closest('.places__card').remove();
          popupConfirmDelete.closePopup();
        })
        .catch((error) => {
          console.log('Ошибка удаления карточки: ' + error);
        });
    });
  }
});