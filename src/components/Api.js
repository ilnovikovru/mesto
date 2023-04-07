export default class Api {
  constructor(config) { // задаем урл для адреса сервера и хедерс - для данные (все придет из индекса)
    this._url = config.url;
    this._headers = config.headers;
  }

  _response = (res) => { // пишем типичную обработку ответа от сервера
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() { // запрашиваем с сервера данные пользователя (Кусто) и обрабатываем ответ
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._response);
  }

  getInitialCards() { // запрашиваем с сервера карточки и обрабатываем ответ
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._response);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._response);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.link
      })
    })
    .then(this._response);
  }

  // deleteCard(id) {
  //   return fetch(`${this._url}${id}`, {
  //     method: 'DELETE',
  //     headers: this._headers
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       return res.json();
  //     }

  //     return Promise.reject('Произошла ошибка');
  //   })
  // }
}
