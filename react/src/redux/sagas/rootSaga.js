import { all, fork } from "redux-saga/effects";

import {
  onGetTutorials,
  onAddTutorial,
  onUpdateTutorial,
  onDeleteTutorial,
  onDeleteAllTutorials,
} from "./handlers/tutorialHandler";

const tutorialSagas = [
  fork(onGetTutorials),
  fork(onAddTutorial),
  fork(onUpdateTutorial),
  fork(onDeleteTutorial),
  fork(onDeleteAllTutorials),
];

export default function* rootSaga() {
  yield all([...tutorialSagas]);
}
