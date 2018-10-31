import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSgaMiddleware from "redux-saga";
import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSgaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
