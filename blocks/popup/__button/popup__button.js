<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 765e2e493197f46889ea392108cfd1802d3e4ec3
const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('#popup__input-name');
const jobInput = document.querySelector('#popup__input-about');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//слушает событие отправки сабмит
formElement.addEventListener('submit', formSubmitHandler);


function formSubmitHandler(evt) {

  //пропускает отправку и продолжает выполнть следующий код
evt.preventDefault();

//присваивает значение из поля ввода писваивает его в контенту разметки
profileTitle.textContent = nameInput.value;
profileSubtitle.textContent = jobInput.value;

//удалем класс элемента
popup.classList.remove('popup_opened');
}

<<<<<<< HEAD
=======
//БЛОК сохранения и отправка формы "редактирования профиля"

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
>>>>>>> develop
=======
>>>>>>> 765e2e493197f46889ea392108cfd1802d3e4ec3
