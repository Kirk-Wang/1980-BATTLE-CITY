// tslint:disable-next-line:no-submodule-imports
import { race, select } from "redux-saga/effects";
import { State } from "../reducers";
import * as actions from "../utils/actions";
import { StageResult, stageSaga } from "./stageSaga";

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

    const result = yield race({
        flow: stageFlow(action.stageIndex),
    });

    console.log(result);
}
