export default class Loading {
  constructor(buttonClass, buttonText) {
    this._button = document.querySelector(buttonClass);
    this.setEventListener();
    this._buttonText = buttonText;
  }

  handleClick(isLoading) {
    if(isLoading) {
      this._button.textContent = 'Сохранение...';
      this._button.disabled = true;
    } else {
      this._button.textContent = this._buttonText;
      this._button.disabled = false;
    }
  }

  setEventListener() {
    this._button.addEventListener('click', () => {
      this.handleClick();
    });
  }
}
