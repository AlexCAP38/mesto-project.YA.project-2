<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 765e2e493197f46889ea392108cfd1802d3e4ec3
const placesLikeIcon = document.querySelectorAll('.places__like-icon');

placesLikeIcon.forEach((item) => {
  item.addEventListener('click', changeLikeIcon);

<<<<<<< HEAD
//пока не знаю как паписать сокращеную форму, вываливается ошибка по синтаксису. надо гуглить
=======
//пока не знаю как паписать сокращение форму, вываливается ошибка по синтаксису. надо гуглить
>>>>>>> 765e2e493197f46889ea392108cfd1802d3e4ec3
  function changeLikeIcon() {
    item.classList.toggle('places__like-icon_active');
  }
})


<<<<<<< HEAD
=======
likeIcon();

function likeIcon() {
  const placesLikeIcon = document.querySelectorAll('.places__like-icon');   //ищем все классы записываем в массив

  placesLikeIcon.forEach((item) => {    //форичем перебераем массив, выбираем текущий элемент
    item.addEventListener('click', function (event) { //на этот элемент навешиваем слушатель
      event.target.classList.toggle('places__like-icon_active');  //через объект евент и таргет удаляем/ ставил класс
    });
  });

};
>>>>>>> develop
=======
>>>>>>> 765e2e493197f46889ea392108cfd1802d3e4ec3
