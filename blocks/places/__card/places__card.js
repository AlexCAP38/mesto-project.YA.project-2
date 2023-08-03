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

const placesTitle = document.querySelectorAll('.places__title');
const placesImage = document.querySelectorAll('.places__image');

//Меняю содержимое карточек на содержимое из массива
for (let i = 0; i < placesTitle.length; i++) {

  placesTitle[i].textContent = initialCards[i].name;
  placesImage[i].setAttribute('src', initialCards[i].link);
}

//Блок открытие модального окна для просмотра изображений

const popupViewerContainer = document.querySelector('#popup-viewer');  //находим форму мод. окна
const popupViewerImage = popupViewerContainer.querySelector('.popup__image'); //в этой форме ищем элемент для картинки
const popupViewerTitle = popupViewerContainer.querySelector('.popup__title'); // в тойже форме ище элемент для наименование

popupViewer();

function popupViewer() {

  placesImage.forEach(function (item) {

    item.addEventListener('click', function (evt) {

      let a = item.getAttribute('src');     //записываем в переменную ссылку текущей картинки
      popupViewerImage.setAttribute('src', a);    //передаем ссылку в просмотрощик

      //передаем контент элемента(название) в контент элемента в просмотрощике
      popupViewerTitle.textContent = item.parentElement.querySelector('.places__title').textContent;

      //открываем попап с картинкой и наполняем контенком
      popupViewerContainer.classList.add('popup_opened');

    })
  });
};