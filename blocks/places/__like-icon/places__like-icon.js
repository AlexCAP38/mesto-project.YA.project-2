likeIcon();

function likeIcon() {
//ищем все классы записываем в массив
const placesLikeIcon = document.querySelectorAll('.places__like-icon');

//форичем перебераем массив на его парамент навешиваем слушатель
placesLikeIcon.forEach((item) => {
  item.addEventListener('click', function (event) {

    // дальше через объкт евент и таргет удаляем/ ставил класс
    event.target.classList.toggle('places__like-icon_active');
  });
});

}