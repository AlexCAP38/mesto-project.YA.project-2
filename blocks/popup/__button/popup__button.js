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

