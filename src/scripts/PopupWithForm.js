import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._formSubmitCallback = formSubmitCallback;

    this._inputPhotoName = document.querySelector(".popup__input-text_type_title");
    this._inputLink = document.querySelector(".popup__input-text_type_link");
    this._closeEditPopupButton = document.querySelector(".popup__close-button");
    this._closeAddNewPhotoPopupButton = document.querySelector(".popup__close-button_add");
    this._closePhotoPopupButton = document.querySelector(".popup__close-button_photo");
    this._formInputs = this._form.querySelectorAll('.popup__input-text');
  }
  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this.close();
    });

    this._closeEditPopupButton.addEventListener("click", () => {
      this.close(this._popup);
    });

    this._closeAddNewPhotoPopupButton.addEventListener("click", () => {
      this.close(this._popup);
    });

    this._closePhotoPopupButton.addEventListener("click", () => {
      this.close(this._popup);
    });
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    this._inputPhotoName.value = "";
    this._inputLink.value = "";
  }
}
