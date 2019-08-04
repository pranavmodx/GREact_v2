const initialState = {
  loading: false,
  error: null,
  words: [],
  currentTopicNo: 0,
  currentWord: {},
  topicIDS: []
};

export default function mainReducer(state = initialState, action) {
  const { currentWord, topicIDS, currentTopicNo } = action.payload || {};

  let topicIDS2 = [];
  let greData = action.payload;

  if (greData) {
    for (let i = 0; i < greData.length; i++) {
      if (i === 0) {
        topicIDS2.push(greData[i].id);
      } else if (greData[i].topic !== greData[i - 1].topic) {
        topicIDS2.push(greData[i].id);
      }
    }
  }

  switch (action.type) {
    case "INITIALIZE_DATA_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "INITIALIZE_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        words: action.payload,
        currentTopicNo: state.currentTopicNo,
        currentWord: action.payload[0],
        topicIDS: topicIDS2
      };
    case "INITIALIZE_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case "SHOW_WORD":
      return {
        ...state,
        // Magic line
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_RANDOM_WORD":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_TOPIC":
      return {
        ...state,
        currentTopicNo: action.payload,
        currentWord: state.words[state.topicIDS[action.payload]]
      };
    case "LOAD_TOPIC":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_SEARCH_RESULT":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "HOME":
      return {
        ...state,
        currentWord: state.words[0],
        currentTopicNo: 0,
        topicIDS: state.topicIDS2
      };
    default:
      return state;
  }
}
