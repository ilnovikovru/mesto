import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handlePopupWithButton) {
    super(popupSelector);
    this._handlePopupWithButton = handlePopupWithButton;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupWithButton(this._cardId);
    })
    this.close();
  }
}
