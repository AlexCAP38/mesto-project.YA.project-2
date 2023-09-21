//  myId: 9ce57464e82d1017fc445957

const config = {
  urlUser: 'https://nomoreparties.co/v1/plus-cohort-28/users/me',
  urlCards: 'https://nomoreparties.co/v1/plus-cohort-28/cards',
  token: 'bd02b005-4f65-48b7-9e39-fbb8e07fc766'
}

//===========================================================================================
//БЛОК получение информации о профиле от сервера
//===========================================================================================
export const getUserProfile = () => {
  return fetch(config.urlUser, {                                 //вернуть результат запроса
    headers: {
      authorization: config.token
    }
  })
    .then((response) => {                                        //получили информацию от сервера
      return checkAnswer(response);                              //проверка запроса
    })
}

//===========================================================================================
//БЛОК Отправка информации на сервере из профиля
//===========================================================================================
export const sendUserProfile = (name, subname) => {
  return fetch(config.urlUser, {                                 //вернуть результат запроса
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
    .then((response) => {                                       //получили обвет об отправке
      return checkAnswer(response);                             //проверим его
    })
}

//===========================================================================================
//БЛОК получение информации об карточка от сервера
//===========================================================================================
export const getCardsSRV = () => {
  return fetch(config.urlCards, {                             //вернуть результат запроса
    headers: {
      authorization: config.token
    }
  })
    .then((response) => {                                     //получили информацию от сервера
      return checkAnswer(response);                           //проверка запроса
    })
}

//===========================================================================================
//БЛОК Отправка карточки на сервер
//===========================================================================================
export const sendCardsSRV = (imageName, imageLink) => {
  return fetch(config.urlCards, {                            //вернуть результат запроса
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
    .then((response) => {                                     //получили ответ об отправке
      return checkAnswer(response);                           //проверка
    })
}

//===========================================================================================
//БЛОК Удаление карточки с сервера
//===========================================================================================
export const deleteCardsSRV = (idCard) => {
  return fetch(`${config.urlCards}/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  })
    .then((response) => {                                     //получили информацию от сервера
      return checkAnswer(response);                           //проверка запроса
    })
}

//===========================================================================================
//БЛОК отправка лайка на сервер
//===========================================================================================
export const sendlikeSRV = (idCard) => {
  return fetch(`${config.urlCards}/likes/${idCard}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    }
  })
    .then((response) => {                                     //получили ответ об отправке
      return checkAnswer(response);                           //проверка
    })
}

//===========================================================================================
//БЛОК удаление лайка с сервера
//===========================================================================================
export const deletelikeSRV = (idCard) => {
  return fetch(`${config.urlCards}/likes/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  })
    .then((response) => {                                     //получили ответ об отправке
      return checkAnswer(response);                           //проверка
    })
}

//===========================================================================================
//БЛОК отправка запроса на обновления аватарки
//===========================================================================================
export const sendAvatar = (input) => {

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
    .then((response) => {                                     //получили ответ об отправке
      return checkAnswer(response);                           //проверка
    })
}

//проверка ответа
//===========================================================================================
const checkAnswer = (response) => {
  if (!response.ok) {                                      //если статус true тогда
    return Promise.reject(`Ошибка: ${response.status}`)
  } else return response.json();                           //распарсим и вернем объект
}