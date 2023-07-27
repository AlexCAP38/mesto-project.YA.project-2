const placesLikeIcon = document.querySelectorAll('.places__like-icon');

placesLikeIcon.forEach((item) => {
  item.addEventListener('click', changeLikeIcon);

//пока не знаю как паписать сокращеную форму, вываливается ошибка по синтаксису. надо гуглить
  function changeLikeIcon() {
    item.classList.toggle('places__like-icon_active');
  }
})


