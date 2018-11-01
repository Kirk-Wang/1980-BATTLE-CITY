import { StageConfig } from "../types";

export enum A {
    LoadStageMap = "LoadStageMap",
}

export type LoadStageMap = ReturnType<typeof loadStageMap>;
export function loadStageMap(stage: StageConfig) {
    return {
        type: A.LoadStageMap as A.LoadStageMap,
        stage,
    };
}

// action 对象的定义
export type Action = LoadStageMap;
