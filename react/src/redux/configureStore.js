import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import tutorialReducer from "./ducks/tutorial";
import rootSaga from "./sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(tutorialReducer, {}, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
