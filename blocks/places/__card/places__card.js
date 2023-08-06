//БЛОК на страницу добавляем n карточек название и ссылки берем из массива
const places = document.querySelector('.places');
const placesCard = places.querySelectorAll('.places__card');

const placesTitle = document.querySelectorAll('.places__title');
const placesImage = document.querySelectorAll('.places__image');


//находим все карточки и удаляем по ТЗ
for (let i = 0; i < placesCard.length; i++) {
  placesCard[i].remove();
}

//Добавляем карточки из массива
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
  likeIcon();   //функция обрабатывает события лайков
}




//Блок открытие модального окна для просмотра изображений

const popupViewerContainer = document.querySelector('#popup-viewer');  //находим форму мод. окна
const popupViewerImage = popupViewerContainer.querySelector('.popup__image'); //в этой форме ищем элемент для картинки
const popupViewerTitle = popupViewerContainer.querySelector('.popup__title'); // в тойже форме ище элемент для наименование


//отслеживает нажатие по всем фотографиям в карточкам.
popupViewer();

function popupViewer() {
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