// tslint:disable-next-line:no-submodule-imports
import { fork, put, select, take } from "redux-saga/effects";
import { State } from "../reducers";
import * as actions from "../utils/actions";

/** 在每个 TICK 的时候，更新坦克的 telmet 持续时间 */
function* handleHelmetDuration() {
    while (true) {
        const { delta }: actions.Tick = yield take(actions.A.Tick);
        const { tanks }: State = yield select();
        for (const tank of tanks.filter(t => t.alive && t.helmetDuration > 0).values()) {
            const nextDuration = Math.max(0, tank.helmetDuration - delta);
            yield put(actions.setHelmetDuration(tank.tankId, nextDuration));
        }
    }
}

export function* powerUpManager() {
    yield fork(handleHelmetDuration);
}
