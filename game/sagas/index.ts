// tslint:disable-next-line:no-submodule-imports
import { put, takeLatest } from "redux-saga/effects";
import * as actions from "../utils/actions";
import { A } from "../utils/actions";
import { gameSaga } from "./gameSaga";

export function* rootSaga() {
    DEV.LOG && console.log("root saga started");
    yield takeLatest(A.StartGame, gameSaga);
    if (DEV.SKIP_CHOOSE_STAGE) {
        yield put(actions.startGame(0));
    }
}
