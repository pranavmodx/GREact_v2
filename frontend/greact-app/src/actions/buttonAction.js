export const onClickAction = ({
  currentWord,
  totalWordsLength,
  targetName
}) => dispatch => {
  if (targetName === "Previous Word") {
    if (currentWord.id === 0) {
      dispatch({ type: "SHOW_WORD", payload: totalWordsLength - 1 });
    } else {
      dispatch({ type: "SHOW_WORD", payload: currentWord.id - 1 });
    }
  } else if (targetName === "Next Word") {
    if (currentWord.id === totalWordsLength - 1) {
      dispatch({ type: "SHOW_WORD", payload: 0 });
    } else {
      dispatch({ type: "SHOW_WORD", payload: currentWord.id + 1 });
    }
  }
};

export const onRandomClickAction = ({
  totalWordsLength,
  targetName
}) => dispatch => {
  if (targetName === "Random Word") {
    dispatch({
      type: "SHOW_RANDOM_WORD",
      payload: Math.floor(Math.random() * totalWordsLength - 1) + 1
    });
  }
};
