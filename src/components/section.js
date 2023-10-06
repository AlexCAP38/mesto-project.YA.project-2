export default class Section {
  constructor({ renderer }, places) {

    this._renderer = renderer;
    this._selectorContainer = places;

  }

  addItem(item) {
    this._selectorContainer.prepend(item);                           //добавит карточку на страницу
  }

  renderer(infoCards) {

    for (let i = 0; i < infoCards.length; i++) {                                //обойдем массив карточек
      this.addItem(this._renderer(infoCards[i]));
    }
  }

}