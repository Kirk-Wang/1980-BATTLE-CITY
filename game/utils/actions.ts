import { StageConfig } from "../types";

export enum A {
    LoadStageMap = "LoadStageMap",
    StartGame = "StartGame",
}

export type LoadStageMap = ReturnType<typeof loadStageMap>;
export function loadStageMap(stage: StageConfig) {
    return {
        type: A.LoadStageMap as A.LoadStageMap,
        stage,
    };
}

export type StartGame = ReturnType<typeof startGame>;
export function startGame(stageIndex: number) {
    return {
        type: A.StartGame as A.StartGame,
        stageIndex,
    };
}

// action 对象的定义
export type Action = LoadStageMap;
