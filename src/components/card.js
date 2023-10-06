import { userId } from './index.js';

export default class Card {

  constructor(templateCard, { deletelikeSRV, sendlikeSRV, handleCardClick,  deleteCard }) {
    this._selector = templateCard;
    this.deleteLikeSRV = deletelikeSRV;
    this.sendlikeSRV = sendlikeSRV;
    this._handleCardClick = handleCardClick;
    this._deleteCard =  deleteCard;
  }

  _getElement() {                                                                             //имещ в шаблон для клонирования, записываем ее в переменную
    return this._selector.content
      .querySelector('.places__card')
      .cloneNode(true);
  }

  _deleteMyCard(getObjcard, newCard) {                                                                       //удаление своей карточки
    const trashLikeIcon = newCard.querySelector('.places__trash-icon');             //найти элемент "иконка корзина", присвоит имя
    if (getObjcard.owner._id === userId) {                                                //если полученный id карточки равен моему, дать возможность удалять
      trashLikeIcon.classList.remove('places__trash-icon_disable');                       //удалит класс скрывающий кнопку
      trashLikeIcon.addEventListener('click', (event) => {                          //событие по клику Удаление карточки
        this._deleteCard(trashLikeIcon);                                                        //показать попап подтверждения удаления => удалить карточку
      });
    }
  }

  _findMyLike = (getObjcard, myId, placesLikeIcon) => {                                     //получает объект карточек и мой id
    if (getObjcard.likes.length > 0) {
      getObjcard.likes.forEach(elm => {                                                   //обходим каждый элемент в объекте likes
        if (elm._id === myId) {                                                           //если id равны
          placesLikeIcon.classList.add('places__like-icon_active');                       //сделать лайк активным
        }
      })
    }
  }

  _deleteLikeSRV(placesLikeIcon, likeCounter) {                                       //удалим лайк с сервера и деактивируем иконку
    this.deleteLikeSRV(placesLikeIcon.closest('.places__card').id)
      .then(() => {
        placesLikeIcon.classList.toggle('places__like-icon_active');
        likeCounter.textContent--                                                     //уменьшим счетчик на -1
      })
      .catch((error) => {
        console.log('Ошибка удаления лайка: ' + error);
      });

  }

  _sendlikeSRV(placesLikeIcon, likeCounter) {
    this.sendlikeSRV(placesLikeIcon.closest('.places__card').id)
      .then(() => {                                                                         //добавил иконку на серве и ативиурем лайк
        placesLikeIcon.classList.toggle('places__like-icon_active');
        likeCounter.textContent++                                                           //увеличим счетчик на +1
      })
      .catch((error) => {
        console.log('Ошибка добавления лайка: ' + error);
      });
  }


  // _showImage(url, name) {                                                        //Функция открытие модального окна для просмотра изображений
  //   const popupViewerContainer = document.querySelector('#popup-viewer');        //находим форму мод. окна
  //   const popupViewerImage = popupViewerContainer.querySelector('.popup__image');//в этой форме ищем элемент для картинки
  //   const popupViewerTitle = popupViewerContainer.querySelector('.popup__title');// в тойже форме ище элемент для наименование


  //   popupViewerImage.setAttribute('src', url);                                 //присваиваем урл атрибут
  //   popupViewerImage.setAttribute('alt', 'Изображение ' + name);

  //   popupViewerTitle.textContent = name;                                       //присваиваем название изображения
  //   this._openPopup(popupViewerContainer);
  //   //openPopup(popupViewerContainer);                                           //открываем попап "просомтр фотографии"
  // }


  //===========================================================================================
  //Метод создает новую карточку из шаблона и возвращает ее в переменной
  createCard(getObjcard) {

    const newCard = this._getElement();
    const placesLikeIcon = newCard.querySelector('.places__like-icon');             //найти элемент "иконка лайка"
    const placesImage = newCard.querySelector('.places__image');                    //найти элемент "фотографию"
    const likeCounter = newCard.querySelector('.places__like-counter');             //найти элемент "счетчик лайков"

    newCard.querySelector('.places__title').textContent = getObjcard.name;          //присваиваем значения из инпутов в карточку
    newCard.querySelector('.places__image').alt = 'Изображение ' + getObjcard.name;
    newCard.querySelector('.places__image').src = getObjcard.link;

    newCard.id = getObjcard._id;                                                     //присвоит иникальный индификатор карточке взятый с сервера

    this._deleteMyCard(getObjcard, newCard);
    this._findMyLike(getObjcard, userId, placesLikeIcon);                            //Функция нахождения моих лайков

    placesLikeIcon.addEventListener('click', (event) => {                           //событие на установки и удаления "Лайка"
      if (placesLikeIcon.classList.contains('places__like-icon_active')) {          //Если иконка активирована зачит
        this._deleteLikeSRV(placesLikeIcon, likeCounter);
      } else {
        this._sendlikeSRV(placesLikeIcon, likeCounter);
      }
    });

    if (getObjcard.likes.length >= 0) {                                              //проверить на наличие лайков
      likeCounter.textContent = getObjcard.likes.length;                             //присвоить кол-во лайков
    }

    placesImage.addEventListener('click', (event) => {                               //событие по нажатию на фотографию
      this._handleCardClick(placesImage.src, getObjcard.name);                             //при нажание на картинку вызываем функцию открытия попапа
    });

    return newCard
  }
}