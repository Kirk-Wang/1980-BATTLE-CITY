// import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import createSgaMiddleware from "redux-saga";
import { createReducer } from "../reducers/index";
import rootSaga from "../sagas/index";
// import history from "../utils/history";

// window.ActionTypes = [];
// const hooks = (_store: any) => (next: any) => (action: any) => {
//     if (action.type !== "Tick" && action.type !== "AfterTick") {
//         window.ActionTypes.push(action.type);
//     }
//     return next(action);
// };

const sagaMiddleware = createSgaMiddleware();

export const store = createStore(createReducer(), applyMiddleware(sagaMiddleware));

// export const store = createStore(reducer, applyMiddleware(routerMiddleware(history), sagaMiddleware));

// const handleLocationChange = (location: any, action?: any) => {
//     store.dispatch({
//         type: "@@router/LOCATION_CHANGE",
//         payload: {
//             location,
//             action,
//         },
//     });
// };
// history.listen(handleLocationChange);
// handleLocationChange(history.location);

sagaMiddleware.run(rootSaga);
