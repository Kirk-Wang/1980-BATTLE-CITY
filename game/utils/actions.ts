import { StageConfig } from "../types";
import { BulletRecord, FlickerRecord, MapRecord, TankRecord } from "../types";

export enum A {
    Tick = "Tick",
    AfterTick = "AfterTick",
    Move = "Move",
    IncKillCount = "IncKillCount",
    AddBullet = "AddBullet",
    ClearBullets = "ClearBullets",
    SetFlicker = "AddOrUpdateFlicker",
    RemoveFlicker = "RemoveFlicker",
    RemoveBullet = "RemoveBullet",
    UpdateBullets = "UpdateBullets",
    StartMove = "StartMove",
    ResetGame = "ResetGame",
    GameResume = "GameResume",
    ShowStatistics = "ShowStatistics",
    HideStatistics = "HideStatistics",
    StopMove = "StopMove",
    UpdateCurtain = "UpdateCurtain",
    UpdateComingStageName = "UpdateComingStageName",
    SetCooldown = "SetCooldown",
    SetHelmetDuration = "SetHelmetDuration",
    SetFrozenTimeout = "SetFrozenTimeout",
    SetBotFrozenTimeout = "SetBotFrozenTimeout",
    LoadStageMap = "LoadStageMap",
    StartGame = "StartGame",
    StartStage = "StartStage",
    BeforeEndGame = "BeforeEndGame",
    EndGame = "EndGame",
    SetReservedTank = "SetReversedTank",
    SetTankVisibility = "SetTankVisibility",
    StartSpawnTank = "StartSpawnTank",
    AddTank = "AddTank",
    UpgardeTank = "UpgardeTank",
    DestroyEagle = "DestroyEagle",
    Hurt = "Hurt",
    ReqAddBot = "ReqAddAIPlayer",
    RemovePowerUpProperty = "RemovePowerUpProperty",
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
    BeforeStartStage = "BeforeStartStage",
    BeforeEndStage = "BeforeEndStage",
    EndStage = "EndStage",
    RemoveFirstRemainingBot = "RemoveFirstRemainingBot",
    UpdateTransientKillInfo = "UpdateTransientKillInfo",
    ShowTotalKillCount = "ShowTotalKillCount",
    GamePause = "GamePause",
    ShowHud = "ShowHud",
    HideHud = "HideHud",
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

export type AfterTick = ReturnType<typeof afterTick>;
export function afterTick(delta: number) {
    return {
        type: A.AfterTick as A.AfterTick,
        delta,
    };
}

export type UpdateComingStageName = ReturnType<typeof updateComingStageName>;
export function updateComingStageName(stageName: string) {
    return {
        type: A.UpdateComingStageName as A.UpdateComingStageName,
        stageName,
    };
}

export type UpdateCurtain = ReturnType<typeof updateCurtain>;
export function updateCurtain(curtainName: "stage-enter-curtain", t: number) {
    return {
        type: A.UpdateCurtain as A.UpdateCurtain,
        curtainName,
        t,
    };
}

export type BeforeStartStage = ReturnType<typeof beforeStartStage>;
export function beforeStartStage(stage: StageConfig) {
    return {
        type: A.BeforeStartStage as A.BeforeStartStage,
        stage,
    };
}

export type RemoveFirstRemainingBot = ReturnType<typeof removeFirstRemainingBot>;
export const removeFirstRemainingBot = () => ({
    type: A.RemoveFirstRemainingBot as A.RemoveFirstRemainingBot,
});

export type ShowStatistics = ReturnType<typeof showStatistics>;
export const showStatistics = () => ({ type: A.ShowStatistics as A.ShowStatistics });

export type HideStatistics = ReturnType<typeof hideStatistics>;
export const hideStatistics = () => ({ type: A.HideStatistics as A.HideStatistics });

export type BeforeEndGame = ReturnType<typeof beforeEndGame>;
export const beforeEndGame = () => ({ type: A.BeforeEndGame as A.BeforeEndGame });

export type EndGame = ReturnType<typeof endGame>;
export const endGame = () => ({ type: A.EndGame as A.EndGame });

export type ResetGame = ReturnType<typeof resetGame>;
export const resetGame = () => ({ type: A.ResetGame as A.ResetGame });

export type DestroyEagle = ReturnType<typeof destroyEagle>;
export const destroyEagle = () => ({ type: A.DestroyEagle as A.DestroyEagle });

export type BeforeEndStage = ReturnType<typeof beforeEndStage>;
export const beforeEndStage = () => ({ type: A.BeforeEndStage as A.BeforeEndStage });

export type EndStage = ReturnType<typeof endStage>;
export const endStage = () => ({ type: A.EndStage as A.EndStage });

export type IncKillCount = ReturnType<typeof incKillCount>;
export function incKillCount(playerName: PlayerName, level: TankLevel) {
    return {
        type: A.IncKillCount as A.IncKillCount,
        playerName,
        level,
    };
}

export type UpdateTransientKillInfo = ReturnType<typeof updateTransientKillInfo>;
export function updateTransientKillInfo(info: Map<PlayerName, Map<TankLevel, number>>) {
    return {
        type: A.UpdateTransientKillInfo as A.UpdateTransientKillInfo,
        info,
    };
}

export type GamePause = ReturnType<typeof gamePause>;
export const gamePause = () => ({ type: A.GamePause as A.GamePause });

export type GameResume = ReturnType<typeof gameResume>;
export const gameResume = () => ({ type: A.GameResume as A.GameResume });

export type ShowTotalKillCount = ReturnType<typeof showTotalKillCount>;
export const showTotalKillCount = () => ({ type: A.ShowTotalKillCount as A.ShowTotalKillCount });

export type ShowHud = ReturnType<typeof showHud>;
export const showHud = () => ({ type: A.ShowHud as A.ShowHud });

export type HideHud = ReturnType<typeof hideHud>;
export const hideHud = () => ({ type: A.HideHud as A.HideHud });

export type ReqAddBot = ReturnType<typeof reqAddBot>;
export const reqAddBot = () => ({ type: A.ReqAddBot as A.ReqAddBot });

export type AddBullet = ReturnType<typeof addBullet>;
export function addBullet(bullet: BulletRecord) {
    return {
        type: A.AddBullet as A.AddBullet,
        bullet,
    };
}

export type RemoveBullet = ReturnType<typeof removeBullet>;
export function removeBullet(bulletId: BulletId) {
    return {
        type: A.RemoveBullet as A.RemoveBullet,
        bulletId,
    };
}

export type UpdateBulelts = ReturnType<typeof updateBullets>;
export function updateBullets(updatedBullets: Map<BulletId, BulletRecord>) {
    return {
        type: A.UpdateBullets as A.UpdateBullets,
        updatedBullets,
    };
}

export type ClearBullets = ReturnType<typeof clearBullets>;
export const clearBullets = () => ({ type: A.ClearBullets as A.ClearBullets });

// action 对象的定义
export type Action =
    | LoadStageMap
    | ActivatePlayer
    | StartGame
    | AddBullet
    | StartStage
    | ReqAddBot
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
    | UpdateComingStageName
    | Tick
    | AfterTick
    | UpdateCurtain
    | ResetGame
    | EndGame
    | ShowStatistics
    | HideStatistics
    | EndStage
    | IncKillCount
    | RemoveFirstRemainingBot
    | UpdateTransientKillInfo
    | ShowTotalKillCount
    | GamePause
    | GameResume
    | ShowHud
    | HideHud
    | SetFlicker
    | RemoveFlicker
    | RemoveBullet
    | UpdateBulelts
    | ClearBullets
    | AddTank;
