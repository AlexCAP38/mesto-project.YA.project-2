import { config } from "../utils/constants.js";

export default class Api {
  constructor(config) {
    this._urlUser = config.urlUser;
    this._urlCards = config.urlCards;
    this._token = config.token;
  }

  //===========================================================================================
  getUserProfile = () => {                                        //получение информации о профиле от сервера
    return fetch(this._urlUser, {                                 //вернуть результат запроса
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {                                        //получили информацию от сервера
        return this._checkAnswer(response);                              //проверка запроса
      })
  }
  //===========================================================================================
  sendUserProfile = (nameInputValue, jobInputValue) => {          //Отправка информации на сервере из профиля
    return fetch(this._urlUser, {                                 //вернуть результат запроса
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInputValue,
        about: jobInputValue
      })
    })
      .then((response) => {                                         //получили обвет об отправке
        return this._checkAnswer(response);                         //проверим его
      })
  }
  //===========================================================================================
  getCardsSRV = () => {                                             //получение информации о карточке от сервера
    return fetch(this._urlCards, {                                  //вернуть результат запроса
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {                                         //получили информацию от сервера
        return this._checkAnswer(response);                         //проверка запроса
      })
  }

  sendCardsSRV = (imageName, imageLink) => {                         //Отправка карточки на сервер
    return fetch(this._urlCards, {                                   //вернуть результат запроса
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: imageName,
        link: imageLink
      })
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  deleteCardsSRV = (idCard) => {                                      //Удаление карточки с сервера
    return fetch(`${config.urlCards}/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: config.token
      }
    })
      .then((response) => {                                           //получили информацию от сервера
        return this._checkAnswer(response);                           //проверка запроса
      })
  }
  //===========================================================================================
  sendlikeSRV = (idCard) => {                                         //отправка лайка на сервер
    return fetch(`${config.urlCards}/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: config.token
      }
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  deletelikeSRV = (idCard) => {                                       //удаление лайка с сервера
    return fetch(`${config.urlCards}/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: config.token
      }
    })
      .then((response) => {                                          //получили ответ об отправке
        return this._checkAnswer(response);                          //проверка
      })
  }
  //===========================================================================================
  sendAvatar = (input) => {                                           //отправка запроса на обновления аватарки
    return fetch(`${config.urlUser}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: input.value
      })
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  _checkAnswer = (response) => {                                     //проверка ответа
    if (!response.ok) {                                              //если статус true тогда
      return response.json()
        .then(err => {
          Promise.reject(`Ошибка: ${err.message}. Код ошибки: ${response.status}`)
        })
    } else return response.json();                                   //распарсим и вернем объект
  }
}