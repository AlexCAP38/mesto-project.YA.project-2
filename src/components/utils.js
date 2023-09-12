export { openPopup, closePopup }

//Функция открытия попапа
//when it is popap opening add event keydown
//===========================================================================================
function openPopup(popup) {
  popup.classList.add('popup_opened');                                    //открываем попап

  document.addEventListener('keydown', pressKey);                         //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.

  popup.addEventListener('click', clickOverlay);                          //Устанавливаем слушатель на клик мыши на всю форму модального окна

}


//Функция закрытия попапа
//===========================================================================================
function closePopup(popup) {

  popup.classList.remove('popup_opened');                                 //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"

  document.removeEventListener('keydown', pressKey);                      //Удалить событие нажатия клавиши

  popup.removeEventListener('click', clickOverlay);                       //Удалить событие клик
}


//Функция клика мыши
//===========================================================================================
function clickOverlay(event) {

  if (event.target.classList.contains('popup') ||                         //Если клик по оверлаю тогда
    event.target.classList.contains('popup__close')) {                    //Если клик по крестику тогда
    closePopup(event.target.closest('.popup'));                           //закрыть попап
  }

}

function pressKey(event) {
  if (event.key === 'Escape') {                                         //Если нажата клавиша Escape, вызовим функция закрытия попапа
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}