import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((view, model) => {
  const { domSelecter, timer, restart } = view;
  const { State } = model;
  const state = new State();
  let curMoles = state._moleIndex;
  let totalScore = state._score;
  let numofMoles = 3;
  let timeLeft = 30;
  let leftMoles = [];
  let waitTime = 1000;
  let timer_On = false;

  domSelecter.resbtn.addEventListener("click", (event) => {
    if (timeLeft > 0) {
      timer_On = true;
    }
    reset();
    initGames();
  });

  const reset = () => {
    leftMoles = leftMoles.concat(curMoles);
    curMoles = [];
    totalScore = 0;
    timeLeft = 30;
    numofMoles = 3;
    restart();
  };

  const countDown = () => {
    // Start the interval timer
    const timerId = setInterval(() => {
      // Check if time has run out
      if (timeLeft < 0) {
        clearInterval(timerId);
        setTimeout(() => {
          alert(`Time is Over! Your total Score is: ${totalScore}`);
        }, 500);
        return;
      }

      // Check if we should stop the timer
      if (timer_On) {
        timer_On = false;
        clearInterval(timerId);
        return;
      }

      // Update the timer and decrement timeLeft
      timer(timeLeft);
      timeLeft--;
    }, waitTime);
  };

  const initGames = () => {
    countDown();
    const intervalId = setInterval(() => {
      if (numofMoles > 0) {
        numofMoles--;
        createMole();
      } else {
        clearInterval(intervalId);
      }
    }, waitTime);
    return intervalId;
  };

  const createMole = () => {
    let newMole = Math.floor(Math.random() * 11);
    while (curMoles.includes(newMole)) {
      newMole = Math.floor(Math.random() * 11); //when the newly genereated block is already occupied
    }
    curMoles.push(newMole);
    state.moleList = curMoles;
    createListener(newMole);
  };

  const createListener = (moleIndex) => {
    let imgId = "#mole_" + moleIndex;
    document
      .querySelector(imgId)
      .addEventListener("click", handleMoleClick, false);

    function handleMoleClick() {
      document
        .querySelector(imgId)
        .removeEventListener("click", handleMoleClick, false); //remove listener to prevent double clicks
      totalScore++;
      state.updateScore = totalScore;
      for (let i = 0; i < curMoles.length; i++) {
        if (curMoles[i] == moleIndex) {
          curMoles.splice(i, 1);
        }
      }
      state.moleList = curMoles;
      //create new mole
      setTimeout(() => {
        if (timer_On == false) {
          createMole();
        }
      }, waitTime);
    }
  };

  window.onload = function () {
    initGames();
  };

  const bootstrap = () => {
    state.moleList = [];
  };
  return { bootstrap };
})(View, Model);
