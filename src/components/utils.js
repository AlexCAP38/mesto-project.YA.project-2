export { openPopup, closePopup }
import { enableValidation } from './validate.js';

//Функция открытия попапа
//when it is popap opening add event keydown
//===========================================================================================
function openPopup(popup) {
  popup.classList.add('popup_opened');                                    //открываем попап

  if (popup.querySelector('form')) {
    popup.querySelector('form').reset();
  }

  document.addEventListener('keydown', pressKey);                         //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
  popup.addEventListener('click', pressKey);                              //Устанавливаем слушатель на клик мыши на всю форму модального окна

  enableValidation({                                                              //Основная проверка
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_active',
    errorClass: 'popup__errorMessange_active',
    inputErrorClass: 'popup__input_error'
  });



}


//Функция закрытия попапа
//===========================================================================================
function closePopup(popup) {
  popup.classList.remove('popup_opened');                                 //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"

  document.removeEventListener('keydown', pressKey);                      //Удалить событие нажатия клавиши
  popup.removeEventListener('click', pressKey);                           //Удалить событие клик

  popup.querySelectorAll('span')                                          //Деактивировать поля с ошибками
    .forEach((element) => {
      element.classList.remove('popup__errorMessange_active');
    })
}


function pressKey(event) {

  if (event.key === 'Escape') {                                           //Если нажата клавиша Escape, вызовим функция закрытия попапа
    document.querySelectorAll('.popup')                                   //найдет все попапы
      .forEach((element) => {                                             //обойдет каждый
        closePopup(element);                                              //вызовит функцию закрытия
      });

  } else if (event.type === 'click' && event.target.classList.contains('popup') || event.type === 'click' && event.target.classList.contains('popup__close')) { //если клик
    closePopup(event.target.closest('.popup'));
  }
}