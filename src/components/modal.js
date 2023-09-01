export {openPopup, closePopup}


//Функция открытия попапа
//when it is popap opening add event keydown
//===========================================================================================
function openPopup(popup) {
  popup.classList.add('popup_opened'); //открываем попап

  //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
  document.addEventListener('keydown', (event) => {

    //Если нажата клавиша Escape, вызовим функция закрытия попапа
    if (event.key === 'Escape') {
      closePopup(popup);
    }

  });

  //Устанавливаем слушатель на клик мыши на всю форму модального окна
  popup.addEventListener('click', (event) => {

    //Оверлей это наш весь попап если по нему щелнули тогда вызываем функцию закрывия окна
    if (popup === event.target) {
      closePopup(popup);
    }

  });
}

//Функция закрытия попапа попапа
//===========================================================================================
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //чтобы прослушивания события не занимала память удаляем ее
  document.removeEventListener('keydown', (event) => { });
  popup.removeEventListener('click', (event) => { });

}

