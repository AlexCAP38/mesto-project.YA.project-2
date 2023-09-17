export { createCard }
import { config, sendlikeSRV, deletelikeSRV } from './api.js';
import { deleteCard } from './index.js';
import { showImage } from './modal.js';


function createCard(getObjcard) {                                                       //Функция собирает новую карточку из темплейта и возвращает ее в переменной
  const templatePlacesCard = document.querySelector('#template-places__card').content;  //находим темплейт по id запихиваем в переменную содержимое темплейта
  const newPlacesCard = templatePlacesCard.querySelector('.places__card').cloneNode(true);//имещ в темплейте элемент для клонирования записываем ее в переменную
  const trashLikeIcon = newPlacesCard.querySelector('.places__trash-icon');             //найти элемент "иконка корзина"
  const placesLikeIcon = newPlacesCard.querySelector('.places__like-icon');             //найти элемент "иконка лайка"
  const placesImage = newPlacesCard.querySelector('.places__image');                    //найти элемент "фотографию"
  const likeCounter = newPlacesCard.querySelector('.places__like-counter');             //найти элемент "счетчик лайков"

  newPlacesCard.querySelector('.places__title').textContent = getObjcard.name;          //присваиваем значения из инпута в карточку
  newPlacesCard.querySelector('.places__image').alt = 'Изображение ' + getObjcard.name;
  newPlacesCard.querySelector('.places__image').src = getObjcard.link;

  //удаление своей карточки
  if (getObjcard.owner._id === config.myId) {                                           //если полученный id карточки равен моему, дать возможность удалять
    trashLikeIcon.classList.remove('places__trash-icon_disable');                       //удалит класс скрывающий кнопку
    trashLikeIcon.addEventListener('click', function (event) {                          //событие по клику Удаление карточки
      deleteCard(trashLikeIcon);                                                        //показать попап подтверждения удаления => удалить карточку
    });
  }

  placesLikeIcon.addEventListener('click', function (event) {                           //событие на установки и удаления "Лайка"
    if (placesLikeIcon.classList.contains('places__like-icon_active')) {                //Если иконка активирована зачит
      deletelikeSRV(config, placesLikeIcon.closest('.places__card').id, placesLikeIcon);//удалим лайк с сервера и деактивируем иконку
      likeCounter.textContent--                                                         //уменьшим счетчик на -1
    } else {
      sendlikeSRV(config, placesLikeIcon.closest('.places__card').id, placesLikeIcon);//добавил иконку на серве и ативиурем лайк
      likeCounter.textContent++                                                         //увеличим счетчик на +1
    }
  });

  if (getObjcard.likes.length >= 0) {                                                   //проверить на наличие лайков
    likeCounter.textContent = getObjcard.likes.length;                                  //присвоить кол-во лайков
  }

  findMyId (getObjcard, config.myId, placesLikeIcon);                                   //Функция нахождения моих лайков

  placesImage.addEventListener('click', function (event) {                              //событие по нажатию на фотографию
    showImage(placesImage.src, getObjcard.name);                                        //при нажание на картинку вызываем функцию открытия попапа
  });

  newPlacesCard.id = getObjcard._id;                                                    //присвоит иникальный индификатор карточке взятый с сервера

  return newPlacesCard
}

                                                                                        //Функция нахождения моих лайков
const findMyId = (obj, myId, placesLikeIcon) => {                                       //получает объект карточек и мой id
  if (obj.likes.length > 0) {
    obj.likes.forEach(elm => {                                                          //обходим каждый элемент в объекте likes
      if (elm._id === myId) {                                                           //если id равны
        placesLikeIcon.classList.add('places__like-icon_active');                       //сделать лайк активным
      }
    })
  }
}