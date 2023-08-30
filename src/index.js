import './pages/index.css';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
const profileEditButton = document.querySelector('.profile__edit-button');  //находим кнопку в доме
const popupEditprofile = document.querySelector('#edit-profile'); //находим форму "редактирования профиля" в доме

const profileTitle = document.querySelector('.profile__title'); //находим элементы на страиницы чтобы их подставить
const profileSubtitle = document.querySelector('.profile__subtitle'); //в поля ввода в попапе

const popupInputName = document.querySelector('#popup__input-name');  // находим input в модальном окне "ред.профиля"
const popupInputAbout = document.querySelector('#popup__input-about');


//отслеживаем событие по нажатию на кнопку "редактирования профиля"
profileEditButton.addEventListener('click', function () {

  openPopup(popupEditprofile); //открываем попап

  popupInputName.setAttribute('value', profileTitle.textContent); //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
  popupInputAbout.setAttribute('value', profileSubtitle.textContent);
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

//Функция собирает новую карточку из темплейта и возвращает ее в переменной
function createCard(nameImage, urlImage) {

  //находим темплейт по id запихиваем в переменную содержимое темплейта
  const templatePlacesCard = document.querySelector('#template-places__card').content;

  //имещ в темплейте элемент для клонирования записываем ее в переменную
  const newPlacesCard = templatePlacesCard.querySelector('.places__card').cloneNode(true);

  //присваиваем значения из инпута в карточку
  newPlacesCard.querySelector('.places__title').textContent = nameImage;
  newPlacesCard.querySelector('.places__image').alt = 'Изображение ' + nameImage;
  newPlacesCard.querySelector('.places__image').src = urlImage;

  //событие по нашатию на иконку удаления
  //находим элемент в текущем клоне
  const trashLikeIcon = newPlacesCard.querySelector('.places__trash-icon');

  trashLikeIcon.addEventListener('click', function (event) {
    //берем текущий элемент ищем родителя и мочим его
    trashLikeIcon.closest('div').remove();
  });

  //событие на установки и удаления "Лайка"
  //находим элемент в текущем клоне
  const placesLikeIcon = newPlacesCard.querySelector('.places__like-icon');

  placesLikeIcon.addEventListener('click', function (event) {
    placesLikeIcon.classList.toggle('places__like-icon_active');
  });

  //событие на нажетия на фотографию
  //находим элемент в текущем клоне
  const placesImage = newPlacesCard.querySelector('.places__image');

  placesImage.addEventListener('click', function (event) {
    // при нажание на картинку вызываем функцию которая открывает попап
    // и собирает для него данные
    showImage(placesImage.src, nameImage);
  });


  return newPlacesCard
}

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

//Блок открытие модального окна для просмотра изображений
//===========================================================================================

const popupViewerContainer = document.querySelector('#popup-viewer');  //находим форму мод. окна
const popupViewerImage = popupViewerContainer.querySelector('.popup__image'); //в этой форме ищем элемент для картинки
const popupViewerTitle = popupViewerContainer.querySelector('.popup__title'); // в тойже форме ище элемент для наименование

function showImage(url, name) {
  //присваиваем урл атрибут
  popupViewerImage.setAttribute('src', url);
  popupViewerImage.setAttribute('alt', 'Изображение ' + name);

  //присваиваем название изображения
  popupViewerTitle.textContent = name;
  openPopup(popupViewerContainer); //открываем попап "просомтр фотографии"

};

//Функция открытия попапа
//when it is popap opening add event keydown
//===========================================================================================

function openPopup(popup) {
  popup.classList.add('popup_opened'); //открываем попап

  //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
  document.addEventListener('keydown', (event) => {

    //Если нажата клавиша Escape, вызовим функция закрытия попапа
    if (event.key === 'Escape') {
      closePopup(popup);
    }

  });

  //Устанавливаем слушатель на клик мыши на всю форму модального окна
  popup.addEventListener('click', (event) => {

    //Оверлей это наш весь попап если по нему щелнули тогда вызываем функцию закрывия окна
    if (popup === event.target) {
      closePopup(popup);
    }

  });




}

//Функция закрытия попапа попапа
//===========================================================================================

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //чтобы прослушивания события не занимала память удаляем ее
  document.removeEventListener('keydown', (event) => { });
  popup.removeEventListener('click', (event) => { });

}

//===========================================================================================
//Валидация форм, проверка на корректность ввода
//===========================================================================================

const profForm = document.querySelector('.popup__form');
const inputElement = profForm.querySelector('.popup__input');
const fieldErrorMessange = profForm.querySelector(`#${inputElement.id}-error`);



inputElement.addEventListener('input', isValid);



//функиця проверки состояния validity
function isValid(evt) {
  https://practicum.yandex.ru/learn/web-plus/courses/467b7164-c86d-4b1f-a89f-52f063a355b4/sprints/121366/topics/11997b4c-d767-4cac-b899-d9ed1fe9c7c6/lessons/e641ad29-f337-4d20-80e8-790918e40ec7/

  //если состонияние валид false тогда будет выдавать сообщение об ошибке из validationMessage
  if (!evt.target.validity.valid) {

    showInputError(fieldErrorMessange, evt.target.validationMessage);

  } else {

    hidenInputError(fieldErrorMessange);

  }

}

function showInputError(spanName, textErrorMessange) {
  spanName.textContent = textErrorMessange;
  spanName.classList.add('popup__errorMessange_active');
}

function hidenInputError(spanName) {
  spanName.textContent = '....';
  spanName.classList.remove('popup__errorMessange_active');
}







//===========================================================================================
//вывод в консоль
//===========================================================================================

function mylog(log) {
  console.log(log);
}



