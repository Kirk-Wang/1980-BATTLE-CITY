// tslint:disable-next-line:no-submodule-imports
import { put, race, select, take, takeEvery } from "redux-saga/effects";
import { spawnTank } from "../sagas/common";
import { PlayerConfig, PlayerRecord, TankRecord } from "../types";
import * as actions from "../utils/actions";
import { A } from "../utils/actions";
import { frame, getNextId } from "../utils/common";
import * as selectors from "../utils/selectors";
import { playerController } from "./playerController";

export function* playerSaga(playerName: PlayerName, config: PlayerConfig) {
    yield takeEvery(A.StartStage, spawnPlayerTank);
    // yield takeEvery(A.BeforeEndStage, reserveTankOnStageEnd);
    // yield takeEvery(playerScoreIncremented, handleIncPlayerScore);
    // yield fork(borrowLifeWatcher);

    while (true) {
        const { tankId }: actions.ActivatePlayer = yield take(playerActivated);
        const result = yield race({
            controller: playerController(tankId, config),
            // tank: playerTankSaga(playerName, tankId),
            // stageEnd: take(A.EndStage),
        });
        // if (result.tank) {
        //     yield put(actions.deactivatePlayer(playerName));
        //     yield fork(spawnPlayerTank);
        // }
    }

    function playerActivated(action: actions.Action) {
        return action.type === A.ActivatePlayer && action.playerName === playerName;
    }

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
