export default class UserInfo {
  constructor({ selectorOfNameElement, selectorOfCaptionElement }) {
    this._userName = document.querySelector(selectorOfNameElement);
    this._userCaption = document.querySelector(selectorOfCaptionElement);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userCaption.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userCaption.textContent = about;
  }

}
