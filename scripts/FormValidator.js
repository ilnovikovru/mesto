class FormValidator {
  constructor(config, form) {
    this._formValidationConfig = config;
    this._formElement = form;
  }

  _disableSubmit(evt) {
    evt.preventDefault();
  }

  enableValidation(config) {
    this._formElement.addEventListener("submit", this._disableSubmit);
    this._formElement.addEventListener("input", () => {
      this._toggleButton(form, config);
    });
    this._addInputListeners(form, config);
    this._toggleButton(form, config);
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

  _toggleButton() {
    const buttonSubmit = this._formElement.querySelector(this._formValidationConfig.submitButtonSelector);
    const isFormValid = this._formElement.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(`${this._formValidationConfig.inactiveButtonClass}`, !isFormValid);
  }

  _addInputListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector));
    inputList.forEach((item) => {
      item.addEventListener("input", (event) => {
        this._handleFormInput(event, this._formValidationConfig);
      });
    });
  }

}

export default FormValidator;
