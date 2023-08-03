//ищем форму для редактирования профиля
const formElement = document.querySelector('#popup__form');

//в ней ищем инпуты
const nameInput = formElement.querySelector('#popup__input-name');
const jobInput = formElement.querySelector('#popup__input-about');

//находим в документе тэги
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//на этоц форме слушает событие отправки сабмит
formElement.addEventListener('submit', function formSubmitHandler(evt) {

  //пропускает отправку и продолжает выполнть следующий код
  evt.preventDefault();

  //присваивает значение из поля ввода писваивает его в контенту разметки
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  //закрываем попап
  popup[0].classList.remove('popup_opened');

});


//ищем форму для доюавления новых карточек
const formNewcard = document.querySelector('#popup__form-new-card');

//в ней ищем инпуты куда будут вводить имя карточки и урл
const nameCardInput = formNewcard.querySelector('#popup__input-name');
const urlInput = formNewcard.querySelector('#popup__input-link');

//установим атрибут обязательные поля для заполнения
nameCardInput.toggleAttribute('required');
urlInput.toggleAttribute('required');

//на этоц форме слушает событие отправки сабмит
formNewcard.addEventListener('submit', function formSubmitHandler(evt) {

  //пропускает отправку и продолжает выполнть следующий код
  evt.preventDefault();

  //будем добавлять новую карточку из темплейта
  //находим темплейт по айди запихиваем в эту переменную содержимое темплейта
  const templatePlacesCard = document.querySelector('#template-places__card').content;

  //имещ какой блок копировать
  const newPlacesCard = templatePlacesCard.querySelector('.places__card').cloneNode(true);

  //присваиваем значения из инпута в карточку
  newPlacesCard.querySelector('.places__title').textContent = nameCardInput.value;
  newPlacesCard.querySelector('.places__image').src = urlInput.value;

  //обнуляю значения т.к. при повторном открытие модалки сохраняются старые значения для инпута
  nameCardInput.value = '';
  urlInput.value = '';

  places.prepend(newPlacesCard);  //добавляем карточку в начало блока

  likeIcon();   //функция для лайков для новых карточек

  trashIcon();  //функиця для удаление новых карточек

popupViewer();

  popup[1].classList.remove('popup_opened');  //закрываем попап

});