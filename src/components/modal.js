export default class Popup {
  constructor() {

  }

  //Функция открытия попапа
  //when it is popap opening add event keydown
  //===========================================================================================
  openPopup(popup) {
    popup.classList.add('popup_opened');                                    //открываем попап

    document.addEventListener('keydown', () => { this.pressKey(event) });                         //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.

    popup.addEventListener('click', () => { this._clickOverlay(event) });                          //Устанавливаем слушатель на клик мыши на всю форму модального окна

  }


  //Функция закрытия попапа
  //===========================================================================================
  closePopup(popup) {

    popup.classList.remove('popup_opened');                                 //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"

    document.removeEventListener('keydown', () => { this.pressKey(event) });                      //Удалить событие нажатия клавиши

    popup.removeEventListener('click', () => { this._clickOverlay(event) });                       //Удалить событие клик
  }


  //Функция клика мыши
  //===========================================================================================
  _clickOverlay(event) {

    if (event.target.classList.contains('popup') ||                         //Если клик по оверлаю тогда
      event.target.classList.contains('popup__close')) {                    //Если клик по крестику тогда
      this.closePopup(event.target.closest('.popup'));                           //закрыть попап
    }

  }

  pressKey(event) {

    if (event.key === 'Escape') {                                         //Если нажата клавиша Escape, вызовим функция закрытия попапа
      const popup = document.querySelector('.popup_opened');
      this.closePopup(popup);
    }
  }

}











