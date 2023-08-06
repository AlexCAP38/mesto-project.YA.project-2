likeIcon();

function likeIcon() {
  const placesLikeIcon = document.querySelectorAll('.places__like-icon');   //ищем все классы записываем в массив

  placesLikeIcon.forEach((item) => {    //форичем перебераем массив, выбираем текущий элемент
    item.addEventListener('click', function (event) { //на этот элемент навешиваем слушатель
      event.target.classList.toggle('places__like-icon_active');  //через объект евент и таргет удаляем/ ставил класс
    });
  });

};