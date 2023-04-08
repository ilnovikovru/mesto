import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback, isLoading, buttonSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._isLoading = isLoading; // добавлено
    this._formSubmitCallback = formSubmitCallback;
    this._submitButton = this._form.querySelector(buttonSelector);
    //this._submitButtonText = this._submitButton.value;


    this._inputPhotoName = document.querySelector(".popup__input-text_type_title");
    this._inputLink = document.querySelector(".popup__input-text_type_link");
    this._formInputs = this._form.querySelectorAll('.popup__input-text');
  }


  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() { // изменено
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._isLoading(true);
      this._formSubmitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  updateSubmitButton(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = 'Сохранить';
      this._submitButton.disabled = false;
    }
  }
}
