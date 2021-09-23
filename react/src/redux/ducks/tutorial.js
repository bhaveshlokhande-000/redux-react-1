export const GET_TUTORIALS = "GET_TUTORIAL";
export const GET_TUTORIALS_SUCCESS = "GET_TUTORIALS_SUCCESS";
export const GET_TUTORIALS_FAILURE = "GET_TUTORIALS_FAILURE";

export const ADD_TUTORIAL = "ADD_TUTORIAL";
export const ADD_TUTORIAL_SUCCESS = "ADD_TUTORIAL_SUCCESS";
export const ADD_TUTORIAL_FAILURE = "ADD_TUTORIAL_FAILURE";

export const UPDATE_TUTORIAL = "UPDATE_TUTORIAL";
export const UPDATE_TUTORIAL_SUCCESS = "UPDATE_TUTORIAL_SUCCESS";
export const UPDATE_TUTORIAL_FAILURE = "UPDATE_TUTORIAL_FAILURE";

export const DELETE_TUTORIAL = "DELETE_TUTORIAL";
export const DELETE_TUTORIAL_SUCCESS = "DELETE_TUTORIAL_SUCCESS";
export const DELETE_TUTORIAL_FAILURE = "DELETE_TUTORIAL_FAILURE";

export const DELETE_ALL_TUTORIALS = "DELETE_ALL_TUTORIALS";
export const DELETE_ALL_TUTORIALS_SUCCESS = "DELETE_ALL_TUTORIALS_SUCCESS";
export const DELETE_ALL_TUTORIALS_FAILURE = "DELETE_ALL_TUTORIALS_FAILURE";

export const getTutorials = () => ({
  type: GET_TUTORIALS,
});

export const getTutorialsSuccess = (tutorials) => ({
  type: GET_TUTORIALS_SUCCESS,
  payload: tutorials,
});

export const getTutorialsFailure = (err) => ({
  type: GET_TUTORIALS_FAILURE,
  payload: err,
});

export const addTutorial = (tutorial) => ({
  type: ADD_TUTORIAL,
  payload: tutorial,
});

export const addTutorialSuccess = (tutorial) => ({
  type: ADD_TUTORIAL_SUCCESS,
  payload: tutorial,
});
export const addTutorialFailure = (err) => ({
  type: ADD_TUTORIAL_FAILURE,
  payload: err,
});

export const updateTutorial = (id, updatedTutorial) => ({
  type: UPDATE_TUTORIAL,
  payload: {
    id,
    tutorial: updatedTutorial,
  },
});

export const updateTutorialSuccess = (id, updatedTutorial) => ({
  type: UPDATE_TUTORIAL_SUCCESS,
  payload: {
    id,
    tutorial: updatedTutorial,
  },
});

export const updateTutorialFailure = (err) => ({
  type: UPDATE_TUTORIAL_FAILURE,
  payload: err,
});

export const deleteTutorial = (id) => ({
  type: DELETE_TUTORIAL,
  payload: id,
});

export const deleteTutorialSuccess = (id) => ({
  type: DELETE_TUTORIAL_SUCCESS,
  payload: id,
});

export const deleteTutorialFailure = (err) => ({
  type: DELETE_TUTORIAL_FAILURE,
  payload: err,
});

export const deleteAllTutorials = () => ({
  type: DELETE_ALL_TUTORIALS,
});

export const deleteAllTutorialsSuccess = () => ({
  type: DELETE_ALL_TUTORIALS_SUCCESS,
});

export const deleteAllTutorialsFailure = (err) => ({
  type: DELETE_ALL_TUTORIALS_FAILURE,
  payload: err,
});

const initialState = {
  tutorial: [],
  error: null,
};

const tutorialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TUTORIALS_SUCCESS:
      return {
        ...state,
        tutorials: action.payload,
      };

    case GET_TUTORIALS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case ADD_TUTORIAL_SUCCESS:
      return {
        ...state,
        tutorials: [...state.tutorials, action.payload],
      };

    case ADD_TUTORIAL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_TUTORIAL_SUCCESS:
      return {
        ...state,
        tutorials: state.tutorials.map((tutorial) =>
          action.payload.tutorial.id === tutorial.id
            ? { tutorial, ...action.payload.tutorial }
            : tutorial
        ),
      };
    case UPDATE_TUTORIAL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TUTORIAL_SUCCESS:
      return {
        ...state,
        tutorials: state.tutorials.filter(
          (tutorial) => action.payload.id !== tutorial.id
        ),
      };
    case DELETE_TUTORIAL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_ALL_TUTORIALS_SUCCESS:
      return {
        ...state,
        tutorials: [],
      };
    case DELETE_ALL_TUTORIALS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tutorialReducer;
