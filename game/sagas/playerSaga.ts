// tslint:disable-next-line:no-submodule-imports
import { put, select, takeEvery } from "redux-saga/effects";
import { spawnTank } from "../sagas/common";
import { PlayerConfig, PlayerRecord, TankRecord } from "../types";
import * as actions from "../utils/actions";
import { A } from "../utils/actions";
import { frame, getNextId } from "../utils/common";
import * as selectors from "../utils/selectors";

export function* playerSaga(playerName: PlayerName, config: PlayerConfig) {
    yield takeEvery(A.StartStage, spawnPlayerTank);

    /**
     * 产生一个玩家坦克必要条件
     */
    function* spawnPlayerTank() {
        const player: PlayerRecord = yield select(selectors.player, playerName);

        let tankPrototype: TankRecord = null;

        if (player.reservedTank) {
            tankPrototype = player.reservedTank;
            yield put(actions.setReservedTank(playerName, null));
        } else if (player.lives > 0) {
            tankPrototype = new TankRecord({ side: "player", color: config.color });
            yield put(actions.decrementPlayerLife(playerName));
        }

        if (tankPrototype) {
            const tankId = getNextId("tank");
            yield spawnTank(
                tankPrototype.merge({
                    tankId,
                    alive: true,
                    x: config.spawnPos.x,
                    y: config.spawnPos.y,
                    direction: "up",
                    helmetDuration: frame(135),
                }),
            );
            yield put(actions.activatePlayer(playerName, tankId));
        }
    }
}
