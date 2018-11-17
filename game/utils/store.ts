import { applyMiddleware, createStore } from "redux";
import createSgaMiddleware from "redux-saga";
import reducer from "../reducers/index";
import rootSaga from "../sagas/index";
const sagaMiddleware = createSgaMiddleware();
// window.Atypes = [];
// const hooks = (store: any) => (next: any) => (action: any) => {
//     if (action.type !== "Tick" && action.type !== "AfterTick") {
//         Atypes.push(action.type);
//     }
//     return next(action);
// };

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
