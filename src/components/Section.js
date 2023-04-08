export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._conatiner = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._initialArray = items;
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._conatiner.append(element);
  }
}
