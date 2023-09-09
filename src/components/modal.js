export { showImage }
import { openPopup } from './utils.js';

//Функция открытие модального окна для просмотра изображений
//===========================================================================================
const popupViewerContainer = document.querySelector('#popup-viewer');               //находим форму мод. окна
const popupViewerImage = popupViewerContainer.querySelector('.popup__image');       //в этой форме ищем элемент для картинки
const popupViewerTitle = popupViewerContainer.querySelector('.popup__title');       // в тойже форме ище элемент для наименование

function showImage(url, name) {
  popupViewerImage.setAttribute('src', url);                                        //присваиваем урл атрибут
  popupViewerImage.setAttribute('alt', 'Изображение ' + name);

  popupViewerTitle.textContent = name;                                              //присваиваем название изображения
  openPopup(popupViewerContainer);                                                  //открываем попап "просомтр фотографии"
}