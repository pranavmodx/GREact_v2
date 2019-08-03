function getGreData() {
  return fetch("http://127.0.0.1:8000/api/words/")
    .then(handleErrors)
    .then(res => res.json());
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function initializeDataAction() {
  return dispatch => {
    dispatch(initializeDataBegin());
    return getGreData()
      .then(json => {
        dispatch(initializeDataSuccess(json));
        // console.log(json);
        return json;
      })
      .catch(error => dispatch(initializeDataFailure(error)));
  };
}

export const initializeDataBegin = () => ({
  type: "INITIALIZE_DATA_BEGIN"
});

export const initializeDataSuccess = gredata => ({
  type: "INITIALIZE_DATA_SUCCESS",
  payload: gredata
});

export const initializeDataFailure = error => ({
  type: "INITIALIZE_DATA_FAILURE",
  payload: error
});
