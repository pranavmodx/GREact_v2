export const fetchTopicAction = ({
  currentTopicNo,
  topicIDS,
  targetName
}) => dispatch => {
  console.log(currentTopicNo);
  console.log(topicIDS);
  console.log(targetName);

  if (targetName === "Previous Topic") {
    console.log("Clicked");
    if (currentTopicNo === 0) {
      dispatch({ type: "SHOW_TOPIC", payload: topicIDS.length - 1 });
    } else {
      dispatch({ type: "SHOW_TOPIC", payload: currentTopicNo - 1 });
    }
  } else if (targetName === "Next Topic") {
    console.log("Clicked");
    if (currentTopicNo === topicIDS.length - 1) {
      dispatch({ type: "SHOW_TOPIC", payload: 0 });
    } else {
      dispatch({ type: "SHOW_TOPIC", payload: currentTopicNo + 1 });
    }
  }
};
