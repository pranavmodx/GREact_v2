export const onClickAction = ({ id }) => dispatch => {
  console.log(id);
  dispatch({ type: "LOAD_TOPIC", payload: id });
};
