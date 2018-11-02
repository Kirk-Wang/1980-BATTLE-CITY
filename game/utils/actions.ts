import { StageConfig } from "../types";
import { FlickerRecord, MapRecord, TankRecord } from "../types";

export enum A {
    Tick = "Tick",
    Move = "Move",
    StartMove = "StartMove",
    StopMove = "StopMove",
    SetCooldown = "SetCooldown",
    SetHelmetDuration = "SetHelmetDuration",
    SetFrozenTimeout = "SetFrozenTimeout",
    SetBotFrozenTimeout = "SetBotFrozenTimeout",
    LoadStageMap = "LoadStageMap",
    StartGame = "StartGame",
    StartStage = "StartStage",
    SetReservedTank = "SetReversedTank",
    SetTankVisibility = "SetTankVisibility",
    StartSpawnTank = "StartSpawnTank",
    AddTank = "AddTank",
    UpgardeTank = "UpgardeTank",
    DestroyEagle = "DestroyEagle",
    Hurt = "Hurt",
    SetFlicker = "AddOrUpdateFlicker",
    RemovePowerUpProperty = "RemovePowerUpProperty",
    RemoveFlicker = "RemoveFlicker",
    RemoveSteels = "RemoveSteels",
    AddRestrictedArea = "AddRestrictedArea",
    RemoveRestrictedArea = "RemoveRestrictedArea",
    ActivatePlayer = "ActivatePlayer",
    SetTankToDead = "SetTankToDead",
    IncPlayerScore = "IncPlayerScore",
    IncrementPlayerLife = "IncrementPlayerLife",
    DecrementPlayerLife = "DecrementPlayerLife",
    RemoveBricks = "RemoveBricks",
    UpdateMap = "UpdateMap",
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

export type Hurt = ReturnType<typeof hurt>;
export function hurt(targetTank: TankRecord) {
    return {
        type: A.Hurt as A.Hurt,
        targetTank,
    };
}

export type Move = ReturnType<typeof move>;
export function move(tank: TankRecord) {
    return {
        type: A.Move as A.Move,
        tankId: tank.tankId,
        x: tank.x,
        y: tank.y,
        rx: tank.rx,
        ry: tank.ry,
        direction: tank.direction,
    };
}

export type SetTankVisibility = ReturnType<typeof setTankVisibility>;
export function setTankVisibility(tankId: TankId, visible: boolean) {
    return {
        type: A.SetTankVisibility as A.SetTankVisibility,
        tankId,
        visible,
    };
}

export type StartMove = ReturnType<typeof startMove>;
export function startMove(tankId: TankId) {
    return {
        type: A.StartMove as A.StartMove,
        tankId,
    };
}

export type StopMove = ReturnType<typeof stopMove>;
export function stopMove(tankId: TankId) {
    return {
        type: A.StopMove as A.StopMove,
        tankId,
    };
}

export type UpgardeTank = ReturnType<typeof upgardeTank>;
export function upgardeTank(tankId: TankId) {
    return {
        type: A.UpgardeTank as A.UpgardeTank,
        tankId,
    };
}

export type RemovePowerUpProperty = ReturnType<typeof removePowerUpProperty>;
export function removePowerUpProperty(tankId: TankId) {
    return {
        type: A.RemovePowerUpProperty as A.RemovePowerUpProperty,
        tankId,
    };
}

export type SetCooldown = ReturnType<typeof setCooldown>;
export function setCooldown(tankId: TankId, cooldown: number) {
    return {
        type: A.SetCooldown as A.SetCooldown,
        tankId,
        cooldown,
    };
}

export type SetBotFrozenTimeout = ReturnType<typeof setBotFrozenTimeout>;
export function setBotFrozenTimeout(timeout: number) {
    return {
        type: A.SetBotFrozenTimeout as A.SetBotFrozenTimeout,
        timeout,
    };
}

export type SetFrozenTimeout = ReturnType<typeof setFrozenTimeout>;
export function setFrozenTimeout(tankId: TankId, frozenTimeout: number) {
    return {
        type: A.SetFrozenTimeout as A.SetFrozenTimeout,
        tankId,
        frozenTimeout,
    };
}

export type SetHelmetDuration = ReturnType<typeof setHelmetDuration>;
export function setHelmetDuration(tankId: TankId, duration: number) {
    return {
        type: A.SetHelmetDuration as A.SetHelmetDuration,
        tankId,
        duration,
    };
}

export type RemoveBricks = ReturnType<typeof removeBricks>;
export function removeBricks(ts: Set<BrickIndex>) {
    return {
        type: A.RemoveBricks as A.RemoveBricks,
        ts,
    };
}

export type RemoveSteels = ReturnType<typeof removeSteels>;
export function removeSteels(ts: Set<SteelIndex>) {
    return {
        type: A.RemoveSteels as A.RemoveSteels,
        ts,
    };
}

export type UpdateMap = ReturnType<typeof updateMap>;
export function updateMap(map: MapRecord) {
    return {
        type: A.UpdateMap as A.UpdateMap,
        map,
    };
}

export type DestroyEagle = ReturnType<typeof destroyEagle>;
export const destroyEagle = () => ({ type: A.DestroyEagle as A.DestroyEagle });

// action 对象的定义
export type Action =
    | LoadStageMap
    | ActivatePlayer
    | StartGame
    | StartStage
    | StartMove
    | StopMove
    | SetFrozenTimeout
    | SetBotFrozenTimeout
    | SetReservedTank
    | SetTankToDead
    | DecrementPlayerLife
    | IncrementPlayerLife
    | IncPlayerScore
    | Hurt
    | Move
    | SetCooldown
    | SetTankVisibility
    | SetHelmetDuration
    | DestroyEagle
    | RemovePowerUpProperty
    | UpgardeTank
    | RemoveBricks
    | RemoveSteels
    | UpdateMap
    | AddRestrictedArea
    | RemoveRestrictedArea
    | AddTank;
