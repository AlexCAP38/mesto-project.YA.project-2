//Блок закрытие модалки через батон клосе
const buttonClose = document.querySelectorAll('.popup__close');


//перебираем пмассив
buttonClose.forEach((item) => {

  //навешиваем на текущий элемент слушатель
  item.addEventListener('click', function (event) {
    event.target.parentElement.stilee
    event.target.parentElement.classList.remove('popup_opened');


    console.log(event.target.parentElement);
  });

});