export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);                                                //находим форму в ДОМЕ
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {                                                                                           //Функция открытия попапа
    this._popup.classList.add('popup_opened');                                                            //открываем попап

    document.addEventListener('keydown', this._handleEscClose.bind(this));                                //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
    this._popup.addEventListener('click', this._handlePopupClose.bind(this));                       //Устанавливаем слушатель на клик мыши на всю форму модального окна

    //  this._popup.addEventListener('click', () => { this.setEventListeners(event) });                       //Устанавливаем слушатель на клик мыши на всю форму модального окна

  }

  closePopup() {                                                                                          //Функция закрытия попапа

    this._popup.classList.remove('popup_opened');                                                         //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"

    document.removeEventListener('keydown', this._handleEscClose.bind(this));                             //Удалить событие нажатия клавиши

    this._popup.removeEventListener('click', this._handlePopupClose.bind(this));                    //Удалить событие клик
  }

  setEventListeners() {

  }

  _handlePopupClose(event) {                                                                              //Функция клика мыши
    if (event.target.classList.contains('popup') ||                                                       //Если клик по оверлаю тогда
      event.target.classList.contains('popup__close')) {                                                  //Если клик по крестику тогда
      this.closePopup();                                                                                  //закрыть попап
    }

  }

  _handleEscClose(event) {

    if (event.key === 'Escape') {                                                                          //Если нажата клавиша Escape, вызовим функция закрытия попапа

      this.closePopup();
    }
  }

}











