import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup){
    super(selectorPopup)
    this._selectorPopup = selectorPopup;
  }

openPopup(url, name){
  super.openPopup();

  const popupViewerImage = this._selectorPopup.querySelector('.popup__image');//в этой форме ищем элемент для картинки
  const popupViewerTitle = this._selectorPopup.querySelector('.popup__title');// в тойже форме ище элемент для наименование

  popupViewerImage.setAttribute('src', url);                                 //присваиваем урл атрибут
  popupViewerImage.setAttribute('alt', 'Изображение ' + name);

  popupViewerTitle.textContent = name;                                       //присваиваем название изображения

}

}