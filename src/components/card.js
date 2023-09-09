export {createCard}
import { showImage } from './modal.js';

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