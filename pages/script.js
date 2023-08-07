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

  popupEditprofile.classList.remove('popup__close_animation'); //удаляем класс с анимацией для закрытия попапа
  popupEditprofile.classList.add('popup_opened'); //открываем попап

  popupInputName.setAttribute('value', profileTitle.textContent); //устанавливаем инпутам атрибуты value присваиваем значение из контекста страницы
  popupInputAbout.setAttribute('value', profileSubtitle.textContent);
});

//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================

const profileAddButton = document.querySelector('.profile__add-button'); //находим кнопку в доме
const popupNewCard = document.querySelector('#popup-new-card'); //находим форму для открятия


profileAddButton.addEventListener('click', function () {  //Открытие попапа при нажатие на кнопку

  popupNewCard.classList.remove('popup__close_animation'); //удаляем класс с анимацией для закрытя попапа
  popupNewCard.classList.add('popup_opened'); //добавляем класс чтобы попап открылся

});


//наполения контентом попапа для добавления новой карточки
//===========================================================================================
const formNewcard = document.querySelector('#popup__form-new-card');  //находим форму для добавления новых карточек

const nameCardInput = formNewcard.querySelector('#popup__input-name');  //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');

nameCardInput.toggleAttribute('required');  //установим атрибут обязательные поля для заполнения
urlInput.toggleAttribute('required');

formNewcard.addEventListener('submit', function formSubmitHandler(evt) {  //событие при нажатие кнопки "сохранить"

  evt.preventDefault();   //пропускает отправку и продолжает выполнть следующий код

  popupNewCard.classList.remove('popup_opened');  //закрываем попап

  addCard(nameCardInput.value, urlInput.value);    //Функция добавления новой карточки в нее мы передаем название и url

  likeCard();   //функция обрабатывает события лайков

  deleteCard();  //функция обрабатывает события для удаление новых карточек

  showImage();  //функция обрабатывает события открытия просмоторщика

});

//будем добавлять новую карточку из темплейта
function addCard(name, link) {

  //находим темплейт по id запихиваем в переменную содержимое темплейта
  const templatePlacesCard = document.querySelector('#template-places__card').content;

  //имещ блок клонируем в переменную
  const newPlacesCard = templatePlacesCard.querySelector('.places__card').cloneNode(true);

  //присваиваем значения из инпута в карточку
  newPlacesCard.querySelector('.places__title').textContent = name;
  newPlacesCard.querySelector('.places__image').src = link;

  //обнуляю значения инпутов т.к. при повторном открытие модалки сохраняются старые значения для инпута
  nameCardInput.value = '';
  urlInput.value = '';

  places.prepend(newPlacesCard);  //добавляем карточку в начало блока

}

//Блок закрытия модальных окон через нажатие кнопки "close"
//===========================================================================================
const buttonClose = document.querySelectorAll('.popup__close');

//перебираем пмассив
buttonClose.forEach((item) => {

  //навешиваем на текущий элемент слушатель
  item.addEventListener('click', function (event) {
    event.target.parentElement.classList.add('popup__close_animation');

    //Условие. если поппап для редактирования профиля то значения не сохраняем
    if (item.parentElement.id === "edit-profile") {
      popupInputName.value = profileTitle.textContent;
      popupInputAbout.value = profileSubtitle.textContent;
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

  // popupEditprofile.classList.add('popup__close_animation'); //анимация плавное закрытие попапа
  popupEditprofile.classList.remove('popup_opened');  //закрываем попап
});

//БЛОК добавления на страницу n карточек название и ссылки берем из массива
//===========================================================================================
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

const places = document.querySelector('.places');
const placesCard = places.querySelectorAll('.places__card');

const placesTitle = document.querySelectorAll('.places__title');
//const placesImage = document.querySelectorAll('.places__image');


//находим все карточки и удаляем по ТЗ
for (let i = 0; i < placesCard.length; i++) {
  placesCard[i].remove();
}

//Добавляем карточки из массива
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
  likeCard();   //функция обрабатывает события лайков
}

//Блок открытие модального окна для просмотра изображений
//===========================================================================================

const popupViewerContainer = document.querySelector('#popup-viewer');  //находим форму мод. окна
const popupViewerImage = popupViewerContainer.querySelector('.popup__image'); //в этой форме ищем элемент для картинки
const popupViewerTitle = popupViewerContainer.querySelector('.popup__title'); // в тойже форме ище элемент для наименование


//отслеживает нажатие по всем фотографиям в карточкам.
showImage();

function showImage() {
  const placesImage = document.querySelectorAll('.places__image');

  placesImage.forEach(function (item) {    //перебираем фотографии

    item.addEventListener('click', function (evt) {   //ждем союытие при нажатие выберает текущую фотография

      let a = item.getAttribute('src');     //получаем урл атрибут  екущей картинки записываем в переменную ссылку
      popupViewerImage.setAttribute('src', a);    //передаем урл атрибут в просмотрощик новому элементу img

      //передаем контент элемента(название) в контент элемента в просмотрощике
      popupViewerTitle.textContent = item.parentElement.querySelector('.places__title').textContent;

      popupViewerContainer.classList.remove('popup__close_animation'); //открываем попап "просомтр фотографии"
      popupViewerContainer.classList.add('popup_opened'); //открываем попап "просомтр фотографии"

    })
  });
};


//Блок удаления карточек
//===========================================================================================

deleteCard();

function deleteCard() {
  //ищем все классы записываем в массив
  const trashLikeIcon = document.querySelectorAll('.places__trash-icon');

  //форичем перебераем массив на него аргумент навешиваем слушатель
  trashLikeIcon.forEach((item) => {
    item.addEventListener('click', function (event) {

      //берем текущий батон ищем родителя и мочим его
      event.target.parentElement.remove();

    });
  });
}


//БЛОК установки и удаления "Лайка"
//===========================================================================================
likeCard();

function likeCard() {
  const placesLikeIcon = document.querySelectorAll('.places__like-icon');   //ищем все классы записываем в массив

  placesLikeIcon.forEach(item => {    //форичем перебераем нодлист, выбираем текущий элемент
    item.addEventListener('click', (event) => { //на этот элемент навешиваем слушатель
      event.target.classList.toggle('places__like-icon_active');  //через объект евент и таргет удаляем/ ставил класс
    });
  });
}