export { openPopup, closePopup }
import { hidenInputError } from './validate.js';


//Функция открытия попапа
//when it is popap opening add event keydown
//===========================================================================================
function openPopup(popup) {
  popup.classList.add('popup_opened');                                              //открываем попап

  document.addEventListener('keydown', (event) => {                                 //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
    if (event.key === 'Escape') {                                                   //Если нажата клавиша Escape, вызовим функция закрытия попапа
      closePopup(popup);
    }
  });

  popup.addEventListener('click', (event) => {                                      //Устанавливаем слушатель на клик мыши на всю форму модального окна
    if (popup === event.target) {                                                   //Оверлей это наш весь попап если по нему щелнули тогда вызываем функцию закрывия окна
      closePopup(popup);
    }
  });
}


//Функция закрытия попапа попапа
//===========================================================================================
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', (event) => { });                          //чтобы прослушивания события не занимала память удаляем ее
  popup.removeEventListener('click', (event) => { });

  popup.querySelectorAll('span')                                                    //найти все элементы по тэгу
    .forEach(element => {                                                           //пройтись по ним
      hidenInputError(element);                                                     //Скрыть сообщение об ошибке т.к. окно зыкрыто
    });

}