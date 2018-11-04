import { PlayerConfig } from "../types";

/** 一块的大小对应16个像素 */
export const BLOCK_SIZE = 16;
/** 坦克的大小 */
export const TANK_SIZE = BLOCK_SIZE;
/** 战场的大小 (13block * 13block) */
export const FIELD_BLOCK_SIZE = 13;
/** 战场的大小 (208pixel * 208pixel) */
export const FIELD_SIZE = BLOCK_SIZE * FIELD_BLOCK_SIZE;
/** 子弹的大小 */
export const BULLET_SIZE = 3;

export const ZOOM_LEVEL = 2;
export const SCREEN_WIDTH = 16 * BLOCK_SIZE;
export const SCREEN_HEIGHT = 15 * BLOCK_SIZE;

/**
 * 坦克的配色方案
 * 共有4种配色方案: 黄色方案, 绿色方案, 银色方案, 红色方案
 * 每种配色方案包括三个具体的颜色值, a对应浅色, b对应一般颜色, c对应深色
 */
interface Schema {
    [color: string]: { a: string; b: string; c: string };
}
export const TANK_COLOR_SCHEMES: Schema = {
    yellow: {
        a: "#E7E794",
        b: "#E79C21",
        c: "#6B6B00",
    },
    green: {
        a: "#B5F7CE",
        b: "#008C31",
        c: "#005200",
    },
    silver: {
        a: "#FFFFFF",
        b: "#ADADAD",
        c: "#00424A",
    },
    red: {
        a: "#FFFFFF",
        b: "#B53121",
        c: "#5A007B",
    },
};

/** 物体的大小(边长) */
export const ITEM_SIZE_MAP = {
    BRICK: 4,
    STEEL: 8,
    RIVER: BLOCK_SIZE,
    SNOW: BLOCK_SIZE,
    FOREST: BLOCK_SIZE,
};

/** 物体铺满地图一整行所需要的数量 */
export const N_MAP = {
    BRICK: FIELD_SIZE / ITEM_SIZE_MAP.BRICK,
    STEEL: FIELD_SIZE / ITEM_SIZE_MAP.STEEL,
    RIVER: FIELD_SIZE / ITEM_SIZE_MAP.RIVER,
    SNOW: FIELD_SIZE / ITEM_SIZE_MAP.SNOW,
    FOREST: FIELD_SIZE / ITEM_SIZE_MAP.FOREST,
};

export const PLAYER_CONFIGS: { [key: string]: PlayerConfig } = {
    player1: {
        color: "yellow",
        control: {
            up: "KeyW",
            left: "KeyA",
            down: "KeyS",
            right: "KeyD",
            fire: "KeyJ",
        },
        spawnPos: {
            x: 4 * BLOCK_SIZE,
            y: 12 * BLOCK_SIZE,
        },
    },
    player2: {
        color: "green",
        control: {
            up: "ArrowUp",
            left: "ArrowLeft",
            down: "ArrowDown",
            right: "ArrowRight",
            fire: "Space",
        },
        spawnPos: {
            x: 8 * BLOCK_SIZE,
            y: 12 * BLOCK_SIZE,
        },
    },
};

/** 游戏原版：每一关中包含powerUp的tank的下标(从0开始计数) */
// export const TANK_INDEX_THAT_WITH_POWER_UP = [3, 10, 17]
/** 复刻版：每一关中包含powerUp的tank的下标(从0开始计数) */
export const TANK_INDEX_THAT_WITH_POWER_UP = [3, 7, 12, 17];

// TODO 该项需要重新测量
/** 不同难度关卡下的 AI 坦克生成速度 */
export const AI_SPAWN_SPEED_MAP = {
    1: 0.7,
    2: 0.85,
    3: 1,
    4: 1.15,
};
