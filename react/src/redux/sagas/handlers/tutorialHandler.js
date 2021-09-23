import { takeEvery, put, call } from "redux-saga/effects";

import {
  getTutorialsSuccess,
  getTutorialsFailure,
  addTutorialSuccess,
  addTutorialFailure,
  updateTutorialSuccess,
  updateTutorialFailure,
  deleteTutorialSuccess,
  deleteTutorialFailure,
  deleteAllTutorialsSuccess,
  deleteAllTutorialsFailure,
} from "../../ducks/tutorial";

import {
  getTutorialsService,
  addTutorialService,
  updateTutorialService,
  deleteTutorialService,
  deleteTutorialsService,
} from "../requests/tutorialService";

import {
  GET_TUTORIALS,
  ADD_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../../ducks/tutorial";

export function* onGetTutorialsAsync() {
  try {
    const response = yield call(getTutorialsService);
    yield put(getTutorialsSuccess(response.data));
  } catch (error) {
    yield put(getTutorialsFailure(error));
  }
}

export function* onGetTutorials() {
  yield takeEvery(GET_TUTORIALS, onGetTutorialsAsync);
}

export function* onAddTutorialAsync({ payload: tutorial }) {
  try {
    const response = yield call(addTutorialService(tutorial));
    const newTutorial = {
      ...tutorial,
      id: response.id,
    };
    yield put(addTutorialSuccess(newTutorial));
  } catch (error) {
    yield put(addTutorialFailure(error));
  }
}

export function* onAddTutorial() {
  yield takeEvery(ADD_TUTORIAL, onAddTutorialAsync);
}

export function* onUpdateTutorialAsync({ payload: { id, tutorial } }) {
  try {
    const response = yield call(() => {
      updateTutorialService(id, tutorial);
    });
    yield put(updateTutorialSuccess({ id, tutorial }));
  } catch (error) {
    yield put(updateTutorialFailure(error));
  }
}

export function* onUpdateTutorial() {
  yield takeEvery(UPDATE_TUTORIAL, onUpdateTutorialAsync);
}

export function* onDeleteTutorialAsync({ payload: id }) {
  try {
    const response = yield call(() => {
      deleteTutorialService(id);
    });
    yield put(deleteTutorialSuccess(id));
  } catch (error) {
    yield put(deleteTutorialFailure(error));
  }
}

export function* onDeleteTutorial() {
  yield takeEvery(DELETE_TUTORIAL, onDeleteTutorialAsync);
}

export function* onDeleteAllTutorialsAsync({ payload: id }) {
  try {
    const response = yield call(deleteTutorialsService);
    yield put(deleteAllTutorialsSuccess(id));
  } catch (error) {
    yield put(deleteAllTutorialsFailure(error));
  }
}

export function* onDeleteAllTutorials() {
  yield takeEvery(DELETE_ALL_TUTORIALS, onDeleteAllTutorialsAsync);
}
