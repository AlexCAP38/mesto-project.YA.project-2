import { profileTitle, profileSubtitle, profileAvatar, getCardsArray, places } from './index.js';
import { closePopup } from './utils.js';
import { initialCards } from './array.js';
import { createCard } from './card.js';

export const config = {
  urlUser: 'https://nomoreparties.co/v1/plus-cohort-28/users/me',
  urlCards: 'https://nomoreparties.co/v1/plus-cohort-28/cards',
  token: 'bd02b005-4f65-48b7-9e39-fbb8e07fc766',
  myId: '9ce57464e82d1017fc445957'
}

//===========================================================================================
//БЛОК получение информации о профиле от сервера
//===========================================================================================
export const getUserProfile = (config) => {                                      //получает урл сервера и токен
  fetch(config.urlUser, {                                                        //запрос
    headers: {
      authorization: config.token
    }
  })

    .then((getresourse) => {                                                      //получили информацию от сервера
      // if (getresourse.ok) {                                                       //если статус true тогда
      //   return getresourse.json();                                                //распарсим JSON ответ в объект
      // } else reject                                                               //иначе ошибка в запросе
      //return getresourse.json();
      return checkAnswer(getresourse);
    })

    .then((answerUserProfile) => {
      setUserProfile(answerUserProfile, profileTitle, profileSubtitle, profileAvatar);//записать информацию на страницу из запроса
    })

    .catch((res) => {
      console.log(`${res.status} Ошибка. что-то с сервером информация о пользователе не получена`);
    })
}

const setUserProfile = (object, name, subname, avatarIcon) => {
  name.textContent = object.name;
  subname.textContent = object.about;
  avatarIcon.src = object.avatar;
}

//===========================================================================================
//БЛОК Обновление информации на сервере из профиля
//===========================================================================================
export const sendUserProfile = (config, name, subname) => {
  fetch(config.urlUser, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: subname
    })
  })
    .catch(() => {
      console.log('Ошибка. Информация о пользователе не сохранена');
    })
}

//===========================================================================================
//БЛОК получение информации об карточка от сервера
//===========================================================================================
export const getCardsSRV = (config) => {
  fetch(config.urlCards, {                                                  //запрос
    headers: {
      authorization: config.token
    }
  })

    .then((getresourse) => {                                     //получили информацию от сервера
      if (getresourse.ok) {                                      //если статус true тогда
        return getresourse.json();                               //распарсим JSON ответ в объект
      } else reject                                              //иначе ошибка в запросе
    })

    .then((objectCards) => {
      objectCards.forEach(element => {
        places.prepend(createCard(element));                     //Передать объект в функцию формирования карточки
      });
    })

    .catch(() => {
      getCardsArray(initialCards);                                //если проблемы с получение карточек загрузит из массива
    });
}

//===========================================================================================
//БЛОК Отправка карточки на сервер
//===========================================================================================
export const sendCardsSRV = (config, imageName, imageLink) => {
  fetch(config.urlCards, {
    method: 'POST',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: imageName,
      link: imageLink
    })
  })
    .catch(() => {
      console.log('Карточка не отправилась на сервер.');
    })
}

//===========================================================================================
//БЛОК Удаление карточки с сервера
//===========================================================================================
export const deleteCardsSRV = (config, idCard) => {
  fetch(`${config.urlCards}/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  })
}

//===========================================================================================
//БЛОК отправка лайка на сервер
//===========================================================================================
export const sendlikeSRV = (config, idCard, placesLikeIcon) => {
  fetch(`${config.urlCards}/likes/${idCard}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    }
  })
    .then(() => {
      placesLikeIcon.classList.toggle('places__like-icon_active');
    })
}


//===========================================================================================
//БЛОК удаление лайка с сервера
//===========================================================================================
export const deletelikeSRV = (config, idCard, placesLikeIcon) => {
  fetch(`${config.urlCards}/likes/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  })
    .then(() => {
      placesLikeIcon.classList.toggle('places__like-icon_active');
    })
}


//===========================================================================================
//БЛОК отправка запроса на обновления аватарки
//===========================================================================================
export const sendAvatar = (config, input, popup) => {

  fetch(`${config.urlUser}/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: input.value
    })
  })
    .then((resourse) => {
      if (resourse.ok) {
        document.querySelector('.profile__avatar').src = input.value;
        closePopup(popup);                                                 //закрываем попап
      }
    })
}

//проверка ответа
//===========================================================================================
const checkAnswer = (res) => {
  if (res.ok) {                                      //если статус true тогда
    return res.json();

  } else return Promise.reject(`Ошибка: ${res.status}`);

}