import { StageConfig } from "../types";
import { FlickerRecord, TankRecord } from "../types";

export enum A {
    Tick = "Tick",
    LoadStageMap = "LoadStageMap",
    StartGame = "StartGame",
    StartStage = "StartStage",
    SetReservedTank = "SetReversedTank",
    StartSpawnTank = "StartSpawnTank",
    AddRestrictedArea = "AddRestrictedArea",
    AddTank = "AddTank",
    SetFlicker = "AddOrUpdateFlicker",
    RemoveFlicker = "RemoveFlicker",
    RemoveRestrictedArea = "RemoveRestrictedArea",
    ActivatePlayer = "ActivatePlayer",
    SetTankToDead = "SetTankToDead",
    IncPlayerScore = "IncPlayerScore",
    IncrementPlayerLife = "IncrementPlayerLife",
    DecrementPlayerLife = "DecrementPlayerLife",
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

export type StartStage = ReturnType<typeof startStage>;
export function startStage(stage: StageConfig) {
    return {
        type: A.StartStage as A.StartStage,
        stage,
    };
}

export type SetReservedTank = ReturnType<typeof setReservedTank>;
export function setReservedTank(playerName: PlayerName, tank: TankRecord) {
    return {
        type: A.SetReservedTank as A.SetReservedTank,
        playerName,
        tank,
    };
}

export type IncrementPlayerLife = ReturnType<typeof incrementPlayerLife>;
export function incrementPlayerLife(playerName: PlayerName, count = 1) {
    return {
        type: A.IncrementPlayerLife as A.IncrementPlayerLife,
        playerName,
        count,
    };
}

export type DecrementPlayerLife = ReturnType<typeof decrementPlayerLife>;
export function decrementPlayerLife(playerName: PlayerName) {
    return {
        type: A.DecrementPlayerLife as A.DecrementPlayerLife,
        playerName,
    };
}

export type Tick = ReturnType<typeof tick>;
export function tick(delta: number) {
    return {
        type: A.Tick as A.Tick,
        delta,
    };
}

/** 坦克开始生成的信号，用于清理场上的 power-ups */
export type StartSpawnTank = ReturnType<typeof startSpawnTank>;
export function startSpawnTank(tank: TankRecord) {
    return {
        type: A.StartSpawnTank as A.StartSpawnTank,
        tank,
    };
}

export type AddRestrictedArea = ReturnType<typeof addRestrictedArea>;
export function addRestrictedArea(areaId: AreaId, area: Rect) {
    return {
        type: A.AddRestrictedArea as A.AddRestrictedArea,
        areaId,
        area,
    };
}

export type AddTank = ReturnType<typeof addTank>;
export function addTank(tank: TankRecord) {
    return {
        type: A.AddTank as A.AddTank,
        tank,
    };
}

export type RemoveRestrictedArea = ReturnType<typeof removeRestrictedArea>;
export function removeRestrictedArea(areaId: AreaId) {
    return {
        type: A.RemoveRestrictedArea as A.RemoveRestrictedArea,
        areaId,
    };
}

export type SetFlicker = ReturnType<typeof setFlicker>;
export function setFlicker(flicker: FlickerRecord) {
    return {
        type: A.SetFlicker as A.SetFlicker,
        flicker,
    };
}

export type RemoveFlicker = ReturnType<typeof removeFlicker>;
export function removeFlicker(flickerId: FlickerId) {
    return {
        type: A.RemoveFlicker as A.RemoveFlicker,
        flickerId,
    };
}

export type ActivatePlayer = ReturnType<typeof activatePlayer>;
export function activatePlayer(playerName: PlayerName, tankId: TankId) {
    return {
        type: A.ActivatePlayer as A.ActivatePlayer,
        playerName,
        tankId,
    };
}

export type SetTankToDead = ReturnType<typeof setTankToDead>;
export function setTankToDead(tankId: TankId) {
    return {
        type: A.SetTankToDead as A.SetTankToDead,
        tankId,
    };
}

export type IncPlayerScore = ReturnType<typeof incPlayerScore>;
export function incPlayerScore(playerName: PlayerName, count: number) {
    return {
        type: A.IncPlayerScore as A.IncPlayerScore,
        playerName,
        count,
    };
}

// action 对象的定义
export type Action =
    | LoadStageMap
    | ActivatePlayer
    | StartGame
    | SetReservedTank
    | SetTankToDead
    | DecrementPlayerLife
    | IncrementPlayerLife
    | IncPlayerScore;
