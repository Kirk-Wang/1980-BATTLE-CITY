// tslint:disable-next-line:no-submodule-imports
import { put, take, takeLatest } from "redux-saga/effects";
import { A } from "../utils/actions";
import { gameSaga } from "./gameSaga";
import { serverChannel } from "./server";

export function* rootSaga() {
    DEV.LOG && console.log("rootSaga");
    yield takeLatest(A.StartGame, gameSaga);
    const action = yield take(serverChannel());
    yield put(action);
}
