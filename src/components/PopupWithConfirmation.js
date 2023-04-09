import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handlePopupWithConfirmation) {
    super(popupSelector);
    this._handlePopupWithConfirmation = handlePopupWithConfirmation;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupWithConfirmation(this._cardId);
    })
    this.close();
  }

  setFormSubmitAction(fn) {
    this._formSubmitAction  = fn;
  }
}
