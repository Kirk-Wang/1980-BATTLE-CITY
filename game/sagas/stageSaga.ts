// tslint:disable-next-line:no-submodule-imports
import { cancelled, put, take } from "redux-saga/effects";
import { StageConfig } from "../types/StageConfig";
import * as actions from "../utils/actions";
import { frame as f } from "../utils/common";
import { Timing } from "../utils/Timing";

export interface StageResult {
    pass: boolean;
    reason?: "eagle-destroyed" | "dead";
}

function* animateCurtainAndLoadMap(stage: StageConfig) {
    try {
        yield put(actions.updateComingStageName(stage.name));
        yield put(actions.updateCurtain("stage-enter-curtain", 0));

        yield* Timing.tween(f(30), t => put(actions.updateCurtain("stage-enter-curtain", t)));

        // 在幕布完全将舞台遮起来的时候载入地图
        yield Timing.delay(f(20));
        // yield put(actions.playSound('stage_start'))
        yield put(actions.loadStageMap(stage));
        yield Timing.delay(f(20));

        yield* Timing.tween(f(30), t => put(actions.updateCurtain("stage-enter-curtain", 1 - t)));
        // todo 游戏开始的时候有一个 反色效果
    } finally {
        if (yield cancelled()) {
            // 将幕布隐藏起来
            yield put(actions.updateCurtain("stage-enter-curtain", 0));
        }
    }
}

export function* stageSaga(stage: StageConfig) {
    DEV.LOG && console.log(`进入第 ${stage.name} 关`);

    try {
        // 播放幕布及加载地图
        yield animateCurtainAndLoadMap(stage);
        // 开始关卡之前
        yield put(actions.beforeStartStage(stage));
        // 显示Hud
        yield put(actions.showHud());
        // 开始关卡
        yield put(actions.startStage(stage));
        while (true) {
            yield take("Waiting Unknown Action");
        }
    } finally {
        yield "unknown";
    }
}
