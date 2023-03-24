export default class PopupWithForm extends Popup {
  constructor(popupSelector) { /// сюда еще колбэк сабмита формы
    super(popupSelector);

  }
  _getInputValues() { // собирает данные всех полей формы

  }

  setEventListeners() { // добавить обработчик клика иконке закрытия и обработчик сабмита формы

  }

  close() { // при закрытии попапа форма должна ещё и сбрасываться

  }

}
