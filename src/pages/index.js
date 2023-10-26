import '../pages/index.css';
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
  profileAddButton,
  buttonEditAvatar,
  profileEditButton,
  options
} from '../utils/constants.js';
//export let userId = undefined;                                       //мой ID получит когда загрузит информацию о пользователе

//БЛОК Создание Экземпляров
//===========================================================================================
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

const createCard = new Card(templateCard, {
  deletelikeSRV: (placesLikeIcon) => { return useApi.deletelikeSRV(placesLikeIcon) },
  sendlikeSRV: (placesLikeIcon) => { return useApi.sendlikeSRV(placesLikeIcon) },
  handleCardClick: (url, name) => { showImage.open(url, name) },
  deleteCard: (evnetClickTrashIcon) => {
    popupConfirmDelete._cbApi(evnetClickTrashIcon);
  }
});

const section = new Section({
  renderer: (element) => { return createCard.createCard(element) }
},
  places);

Promise.all([useApi.getUserProfile(), useApi.getCardsSRV()])
  .then(([infoUser, infoCards]) => {                                 //получаем ответы ввиде массивов
    userInfo.setUserInfo(infoUser);
    section.renderer(infoCards);
  })
  .catch((error) => {
    console.log('-->>   ' + error + '   <<-- ошибка в коде !!!');
  });

const showImage = new PopupWithImage('#popup-viewer');                                //Создаем экземпляр для отображения картинок
showImage.setEventListeners();

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
const popupWithFormUserProfile = new PopupWithForm('#edit-profile',
  {
    cbApi: (data) => {                                                                                        //БЛОК сохранения и отправка формы "редактирования профиля"

      const formElementEditProfile = document.forms['popup__form-edit-profile'];                              //ищем форму отправки попапа "редактирования профиля"
      const nameInput = formElementEditProfile.querySelector('#popup__input-name');                           //в ней ищем инпуты
      const jobInput = formElementEditProfile.querySelector('#popup__input-about');

      const profileTitle = document.querySelector('.profile__title');                                         //элемент имя
      const profileSubtitle = document.querySelector('.profile__subtitle');                                   //элемент субтайтл

      formElementEditProfile.addEventListener('submit', function formSubmitHandler(evt) {                     //отслеживаем событие нажатия кнопки сохранить
        evt.preventDefault();                                                                                 //пропускает событие сабмит и продолжает выполнть следующий код

        formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';                 //типа прогресс бар при нажантие на кнопку меняем название кнопки

        useApi.sendUserProfile(nameInput.value, jobInput.value)
          .finally(() => {
            profileTitle.textContent = nameInput.value;
            profileSubtitle.textContent = jobInput.value;
            popupWithFormUserProfile.closePopup();
            formElementEditProfile.removeEventListener('submit', formSubmitHandler);
          });
      });
    }
  });

const formValidatorUserProfile = new FormValidator(options, '#edit-profile');                           //создание экземпляра валидации формы

profileEditButton.addEventListener('click', () => {                                                     //событие по нажатию на кнопку "редактирования профиля"
  formValidatorUserProfile.enableValidation();                                                          //Валидация инпутов, проверка на корректность ввода

  const popupInputName = document.querySelector('#popup__input-name');                                  //поле ввода "имени" в модальном окне "ред.профиля"
  const popupInputAbout = document.querySelector('#popup__input-about');                                //поле ввода "о себе"  в модальном окне "ред.профиля"
  popupInputName.value = userInfo.getUserInfo().name;                                                   //обновляем контект каждый раз при открытие попапа
  popupInputAbout.value = userInfo.getUserInfo().about;

  popupWithFormUserProfile.setEventListeners();                                                         //Событие на закрытие окна (клик на всю форму модального окна)
  popupWithFormUserProfile.openPopup();
});

//БЛОК Обновление аватарки на сервере
//===========================================================================================
const popupWithFormEditAvatar = new PopupWithForm('#popup-edit-avatar', {
  cbApi: () => {
    const formEditAvatar = document.forms['popup__form-edit-avatar'];           //элемент форма
    const btnEditAvatar = formEditAvatar.querySelector('button');

    formEditAvatar.addEventListener('submit', function formSubmitHandler(evt) {
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
          formEditAvatar.removeEventListener('submit', formSubmitHandler);
        })
    });
  }
});

const formValidatorEditAvatar = new FormValidator(options, '#popup__form-edit-avatar');                            //создание экземпляра валидации формы

buttonEditAvatar.addEventListener('click', () => {
  formValidatorEditAvatar.enableValidation();
  popupWithFormEditAvatar.setEventListeners();
  popupWithFormEditAvatar.openPopup();
});

//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================
const popupWithFormNewCard = new PopupWithForm('#popup-new-card',
  {
    cbApi: () => {                                                                      //событие по нажатию на кнопку сохранить и добавления новой карточки
      const formNewcard = document.forms['popup__form-new-card'];                       //находим форму для добавления новых карточек
      const nameCardInput = formNewcard.querySelector('#popup__input-name');            //в форме ищем инпуты куда будут вводить имя карточки и url
      const urlInput = formNewcard.querySelector('#popup__input-link');

      formNewcard.addEventListener('submit', function formSubmitHandler(evt) {          //событие при нажатие кнопки "сохранить"
        evt.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код

        evt.target.querySelector('.popup__button').textContent = 'Сохранение...';

        useApi.sendCardsSRV(nameCardInput.value, urlInput.value)                        //отправим запрос на сервер о добавление новой карточки
          .then((result) => {                                                           //при успешно добавление
            section.renderer([result]);                                                 //добавим карточку в дом
            popupWithFormNewCard.closePopup();                                          //закрываем попап
          })
          .catch((error) => {
            console.log('Ошибка отправки: ' + error);
          })
          .finally(() => {
            evt.target.querySelector('.popup__button').textContent = 'Сохранить'
            formNewcard.removeEventListener('submit', formSubmitHandler);
          })
      });

    }
  });

const formValidatorNewCard = new FormValidator(options, '#popup-new-card');                            //создание экземпляра валидации формы

profileAddButton.addEventListener('click', () => {                                                    //Событие по нажатию на кнопку "добавление новой карточки"
  formValidatorNewCard.enableValidation();                                                            //Проверка формы
  popupWithFormNewCard.setEventListeners();
  popupWithFormNewCard.openPopup();                                                                   //Открывает попап
});

//===========================================================================================
//Блок подтверждения удаления карточки
//===========================================================================================

const popupConfirmDelete = new PopupWithForm('#popup-confirm-delete-card', {
  cbApi: (evnetClickIcon) => {

    popupConfirmDelete.openPopup();
    //popupConfirmDelete.setEventListeners();
    const btnConfirmDelete = document.forms['popup__form-confirm-delete-card'];                             //найтдет форму

    btnConfirmDelete.addEventListener('submit', function formSubmitHandler(event) {                                                //событие на сабмит формы
      event.preventDefault();                                                                               //пропускает отправку и продолжает выполнть следующий код

      useApi.deleteCardsSRV(evnetClickIcon.target.closest('.places__card').getAttribute('id'))                              //отправит запрос на удаление карточик
        .then(() => {
          evnetClickIcon.target.closest('.places__card').remove();
          popupConfirmDelete.closePopup();
        })
        .catch((error) => {
          console.log('Ошибка удаления карточки: ' + error);
        })
        .finally(() => {
          btnConfirmDelete.removeEventListener('submit', formSubmitHandler);

        })
    });
  }
});