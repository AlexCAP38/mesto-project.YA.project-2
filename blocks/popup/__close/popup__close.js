//Блок закрытие модалки через батон клосе
const buttonClose = document.querySelectorAll('.popup__close');


//перебираем пмассив
buttonClose.forEach((item) => {

  //навешиваем на текущий элемент слушатель
  item.addEventListener('click', function (event) {
    event.target.parentElement.classList.add('popup__close_animation');


//Условие. если поппап для редактирования профиля то значения не сохраняем
    if (item.parentElement.id === "edit-profile"){
      popupInputName.value= profileTitle.textContent;
      popupInputAbout.value= profileSubtitle.textContent;
    }
  });
});