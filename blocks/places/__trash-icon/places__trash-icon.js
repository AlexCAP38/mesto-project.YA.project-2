trashIcon();

function trashIcon() {
  //ищем все классы записываем в массив
  const trashLikeIcon = document.querySelectorAll('.places__trash-icon');

  //форичем перебераем массив на него аргумент навешиваем слушатель
  trashLikeIcon.forEach((item) => {
    item.addEventListener('click', function (event) {

      //берем текущий батон ищем родителя и мочим его
      event.target.parentElement.remove();

    });
  });
}