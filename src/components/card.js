import { deleteCard, userId } from './index.js';

export default class Card {

  constructor(templateCard, { deletelikeSRV, sendlikeSRV, openPopup }) {
    this._selector = templateCard;
    this._deleteLikeSRV = deletelikeSRV;
    this._sendlikeSRV = sendlikeSRV;
    this._openPopup = openPopup;
  }

  _getElement() {
    const newCard = this._selector.content
      .querySelector('.places__card')
      .cloneNode(true);//имещ в шаблон для клонирования записываем ее в переменную
    return newCard
  }

  // _deleteMyCard() {                                                                       //удаление своей карточки
  //   const trashLikeIcon = this._getElement.querySelector('.places__trash-icon');             //найти элемент "иконка корзина", присвоит имя
  //   if (getObjcard.owner._id === userId) {                                                //если полученный id карточки равен моему, дать возможность удалять
  //     trashLikeIcon.classList.remove('places__trash-icon_disable');                       //удалит класс скрывающий кнопку
  //     trashLikeIcon.addEventListener('click', (event) => {                          //событие по клику Удаление карточки
  //       deleteCard(trashLikeIcon);                                                        //показать попап подтверждения удаления => удалить карточку
  //     });
  //   }
  // }
  //===========================================================================================
  //Метод создает новую карточку из шаблона и возвращает ее в переменной
  createCard(getObjcard) {

    const placesLikeIcon = this._getElement().querySelector('.places__like-icon');             //найти элемент "иконка лайка"
    const placesImage = this._getElement().querySelector('.places__image');                    //найти элемент "фотографию"
    const likeCounter = this._getElement().querySelector('.places__like-counter');             //найти элемент "счетчик лайков"

    this._getElement().querySelector('.places__title').textContent = getObjcard.name;          //присваиваем значения из инпутов в карточку
    this._getElement().querySelector('.places__image').alt = 'Изображение ' + getObjcard.name;
    this._getElement().querySelector('.places__image').src = getObjcard.link;


    // placesLikeIcon.addEventListener('click', (event) => {                           //событие на установки и удаления "Лайка"
    //   if (placesLikeIcon.classList.contains('places__like-icon_active')) {                //Если иконка активирована зачит
    //     this._deleteLikeSRV(placesLikeIcon, likeCounter);
    //   } else {
    //     this._sendlikeSRV(placesLikeIcon, likeCounter);
    //   }
    // });

    // if (getObjcard.likes.length >= 0) {                                                   //проверить на наличие лайков
    //   likeCounter.textContent = getObjcard.likes.length;                                  //присвоить кол-во лайков
    // }

    // this._findMyId(getObjcard, userId, placesLikeIcon);                                   //Функция нахождения моих лайков

    // placesImage.addEventListener('click', (event) => {                              //событие по нажатию на фотографию
    //   this._showImage(placesImage.src, getObjcard.name);                                        //при нажание на картинку вызываем функцию открытия попапа
    // });

    // newCard.id = getObjcard._id;                                                          //присвоит иникальный индификатор карточке взятый с сервера

    return newCard
  }

  // //===========================================================================================
  // //Функция нахождения моих лайков
  // _findMyId = (getObjcard, myId, placesLikeIcon) => {                                     //получает объект карточек и мой id
  //   if (getObjcard.likes.length > 0) {
  //     getObjcard.likes.forEach(elm => {                                                   //обходим каждый элемент в объекте likes
  //       if (elm._id === myId) {                                                           //если id равны
  //         placesLikeIcon.classList.add('places__like-icon_active');                       //сделать лайк активным
  //       }
  //     })
  //   }
  // }

  // //Функция открытие модального окна для просмотра изображений
  // //===========================================================================================
  // _showImage(url, name) {
  //   const popupViewerContainer = document.querySelector('#popup-viewer');        //находим форму мод. окна
  //   const popupViewerImage = popupViewerContainer.querySelector('.popup__image');//в этой форме ищем элемент для картинки
  //   const popupViewerTitle = popupViewerContainer.querySelector('.popup__title');// в тойже форме ище элемент для наименование


  //   popupViewerImage.setAttribute('src', url);                                 //присваиваем урл атрибут
  //   popupViewerImage.setAttribute('alt', 'Изображение ' + name);

  //   popupViewerTitle.textContent = name;                                       //присваиваем название изображения
  //   this._openPopup(popupViewerContainer);
  //   //openPopup(popupViewerContainer);                                           //открываем попап "просомтр фотографии"
  // }




}