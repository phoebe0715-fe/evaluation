export const View = (() => {
  const domSelecter = {
    resbtn: document.querySelector("#reset"),
    timer: document.querySelector("#time_left"),
    score: document.querySelector("#score"),
    moleElements: {
      mole0: document.querySelector("#mole_0"),
      mole1: document.querySelector("#mole_1"),
      mole2: document.querySelector("#mole_2"),
      mole3: document.querySelector("#mole_3"),
      mole4: document.querySelector("#mole_4"),
      mole5: document.querySelector("#mole_5"),
      mole6: document.querySelector("#mole_6"),
      mole7: document.querySelector("#mole_7"),
      mole8: document.querySelector("#mole_8"),
      mole9: document.querySelector("#mole_9"),
      mole10: document.querySelector("#mole_10"),
      mole11: document.querySelector("#mole_11"),
    },
  };

  const toggleVisibility = (moleIndexes) => {
    let moles = Object.values(domSelecter.moleElements);
    for (let i = 0; i < moles.length; i++) {
      if (!moleIndexes.includes(i)) {
        moles[i].style.display = "none";
      } else {
        moles[i].style.display = "block";
      }
    }
  };
  const updateScore = (score) => {
    domSelecter.score.innerHTML = score;
  };
  const timer = (timeLeft) => {
    domSelecter.timer.innerHTML = timeLeft;
  };

  const restart = () => {
    toggleVisibility([]);
    updateScore(0);
    timer(30);
  };

  return {
    domSelecter,
    toggleVisibility,
    updateScore,
    timer,
    restart,
  };
})();
