//БЛОК "Новая карточка"

const profileAddButton = document.querySelector('.profile__add-button'); //находим кнопку в доме
const popupNewCard = document.querySelector('#popup-new-card'); //находим форму для открятия

//Открытие попапа при нажатие на карточку
profileAddButton.addEventListener('click', function () {

  popupNewCard.classList.remove('popup__close_animation'); //удаляем анимацией для закрытиея попапа
  popupNewCard.classList.add('popup_opened'); //добавляем класс чтобы попап открылся

});



//БЛОК формирует новует карточку и добавляет его в контент

const formNewcard = document.querySelector('#popup__form-new-card');  //ищем форму для добавления новых карточек

const nameCardInput = formNewcard.querySelector('#popup__input-name');  //в форме ищем инпуты куда будут вводить имя карточки и url
const urlInput = formNewcard.querySelector('#popup__input-link');

nameCardInput.toggleAttribute('required');  //установим атрибут обязательные поля для заполнения
urlInput.toggleAttribute('required');

//событие при нажатие кнопки "сохранить"
formNewcard.addEventListener('submit', function formSubmitHandler(evt) {

  //пропускает отправку и продолжает выполнть следующий код
  evt.preventDefault();

  addCard(nameCardInput.value, urlInput.value);    //Функция добавления новой карточки

  likeIcon();   //функция обрабатывает события лайков

  trashIcon();  //функция обрабатывает события для удаление новых карточек

  popupViewer();  //функция обрабатывает события открытия просмоторщика

  popupNewCard.classList.remove('popup_opened');  //закрываем попап

});


function addCard(name, link) {

  //будем добавлять новую карточку из темплейта
  //находим темплейт по id запихиваем в переменную содержимое темплейта
  const templatePlacesCard = document.querySelector('#template-places__card').content;

  //имещ какой блок копировать будем копировать
  const newPlacesCard = templatePlacesCard.querySelector('.places__card').cloneNode(true);

  //присваиваем значения из инпута в карточку
  newPlacesCard.querySelector('.places__title').textContent = name;
  newPlacesCard.querySelector('.places__image').src = link;

  //обнуляю значения т.к. при повторном открытие модалки сохраняются старые значения для инпута
  nameCardInput.value = '';
  urlInput.value = '';

  places.prepend(newPlacesCard);  //добавляем карточку в начало блока

}