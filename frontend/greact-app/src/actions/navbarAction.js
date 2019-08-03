export const onKeyPressAction = ({ e, key, words }) => dispatch => {
  console.log(key);
  if (key === "Enter") {
    e.preventDefault();
    for (let i = 0; i < words.length; i++) {
      if (words[i].word.toLowerCase() === e.target.value.toLowerCase()) {
        dispatch({ type: "SHOW_SEARCH_RESULT", payload: i });
        break;
      }
    }
  }
};
