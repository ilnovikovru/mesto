class FormValidator {
  constructor(config, form) {
    this._formValidationConfig = config;
    this._formElement = form;
    this._submitButton = this._formElement.querySelector(this._formValidationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector));
  }

  _disableSubmit(evt) {
    evt.preventDefault();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", this._disableSubmit);
    this._formElement.addEventListener("input", () => {
      this.toggleButton();
    });
    this._addInputListeners();
    this.toggleButton();
  }

  _handleFormInput(event, config) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = "";
    } else {
      input.classList.add(config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  toggleButton() {
    const isFormValid = this._formElement.checkValidity();

    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(`${this._formValidationConfig.inactiveButtonClass}`, !isFormValid);
  }

  _addInputListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", (event) => {
        this._handleFormInput(event, this._formValidationConfig);
      });
    });
  }

}

export default FormValidator;
