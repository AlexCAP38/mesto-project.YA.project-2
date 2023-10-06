export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  //Функция открытия попапа
  //when it is popap opening add event keydown
  //===========================================================================================
  openPopup() {

    this._selectorPopup.classList.add('popup_opened');                                    //открываем попап

    document.addEventListener('keydown', () => { this._handleEscClose(event) });                         //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.

    this._selectorPopup.addEventListener('click', () => { this.setEventListeners(event) });                          //Устанавливаем слушатель на клик мыши на всю форму модального окна

  }


  //Функция закрытия попапа
  //===========================================================================================
  closePopup() {

    this._selectorPopup.classList.remove('popup_opened');                                 //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"

    document.removeEventListener('keydown', () => { this._handleEscClose(event) });                      //Удалить событие нажатия клавиши

    this._selectorPopup.removeEventListener('click', () => { this.setEventListeners(event) });                       //Удалить событие клик
  }


  //Функция клика мыши
  //===========================================================================================
  setEventListeners(event) {

    if (event.target.classList.contains('popup') ||                         //Если клик по оверлаю тогда
      event.target.classList.contains('popup__close')) {                    //Если клик по крестику тогда
      this.closePopup(event.target.closest('.popup'));                           //закрыть попап
    }

  }

  _handleEscClose(event) {


    if (event.key === 'Escape') {                                         //Если нажата клавиша Escape, вызовим функция закрытия попапа
      
      this.closePopup();
    }
  }

}











