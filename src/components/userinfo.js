export default class UserInfo {
  constructor({ title, subtitle, getInfo, sendIfo }) {
    this._title = title;
    this._subtitle = subtitle;
    this._getInfo = getInfo;
    this._sendInfo = sendIfo;
  }

  getUserInfo() {
    const popupInputName = document.querySelector('#popup__input-name');  //поле ввода "имени" в модальном окне "ред.профиля"
    const popupInputAbout = document.querySelector('#popup__input-about');//поле ввода "о себе"  в модальном окне "ред.профиля"

    this._getInfo()
      .then((info) => {
        popupInputName.value = info.name;
        popupInputAbout.value = info.about;
      })
      .catch((error) => {
        console.log('-->>   ' + error + '   <<-- ошибка в коде !!!');
      })
  }

  setUserInfo(name, about) {
    const formElementEditProfile = document.querySelector('#popup__form-edit-profile'); //ищем форму отправки попапа "редактирования профиля"

    this._sendInfo(name, about)
      .then((result) => {
        this._title.textContent = result.name;                                       //присваивает элементам на страницы значение из ответа сервера
        this._subtitle.textContent = result.about;

        //closePopup(popupEditprofile);                                                 //закрываем попап
        popup.closePopup(popupEditprofile);
      })
      .catch((error) => {
        console.log('Ошибка: ' + error);
      })
      .finally(() => {
        formElementEditProfile.querySelector('.popup__button').textContent = 'Сохранить'; //при любом исходе промиса возрашаем название кнопки
      })
  }

}