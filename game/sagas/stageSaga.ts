// tslint:disable-next-line:no-submodule-imports
import { put, take } from "redux-saga/effects";
import { StageConfig } from "../types/StageConfig";
import * as actions from "../utils/actions";

export interface StageResult {
    pass: boolean;
    reason?: "eagle-destroyed" | "dead";
}

export function* stageSaga(stage: StageConfig) {
    DEV.LOG && console.log(`进入第 ${stage.name} 关`);

    try {
        // 载入地图
        yield put(actions.loadStageMap(stage));
        yield put(actions.startStage(stage));
        while (true) {
            yield take("Waiting Unknown Action");
        }
    } finally {
        yield "unknown";
    }
}
