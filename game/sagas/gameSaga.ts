// tslint:disable-next-line:no-submodule-imports
import { all, race, select } from "redux-saga/effects";
import { State } from "../reducers";
import * as actions from "../utils/actions";
import { PLAYER_CONFIGS } from "../utils/constants";
import { playerSaga } from "./playerSaga";
import { StageResult, stageSaga } from "./stageSaga";
import { tickEmitter } from "./tickEmitter";

/**
 * 关卡控制，一关接一关
 * @param startStageIndex
 */
function* stageFlow(startStageIndex: number) {
    const { stages }: State = yield select();
    for (const stage of stages.slice(startStageIndex)) {
        const stageResult: StageResult = yield stageSaga(stage);
        DEV.LOG && console.log("stageResult:", stageResult);
    }
}

export function* gameSaga(action: actions.StartGame) {
    DEV.LOG && console.log("GAME STARTED");

    // 玩家
    const players = [playerSaga("player-1", PLAYER_CONFIGS.player1)];

    const result = yield race({
        tick: tickEmitter({}),
        players: all(players),
        // 关卡流程
        flow: stageFlow(action.stageIndex),
    });

    console.log(result);
}
