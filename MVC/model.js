import { View } from "./view.js";
export const Model = ((view) => {
  const { toggleVisibility, updateScore } = view;

  class State {
    constructor() {
      this._score = 0;
      this._moleIndex = [];
    }

    get moleList() {
      return this._moleIndex;
    }

    set moleList(newMoleIndex) {
      this._moleArr = newMoleIndex;
      toggleVisibility(this._moleArr);
    }

    set updateScore(score) {
      this._score = score;
      updateScore(this._score);
    }
  }

  return {
    State,
    toggleVisibility,
    updateScore,
  };
})(View);
