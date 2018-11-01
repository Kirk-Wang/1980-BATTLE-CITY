/** 一块的大小对应16个像素 */
export const BLOCK_SIZE = 16;
/** 战场的大小 (13block * 13block) */
export const FIELD_BLOCK_SIZE = 13;
/** 战场的大小 (208pixel * 208pixel) */
export const FIELD_SIZE = BLOCK_SIZE * FIELD_BLOCK_SIZE;

export const ZOOM_LEVEL = 2;
export const SCREEN_WIDTH = 16 * BLOCK_SIZE;
export const SCREEN_HEIGHT = 15 * BLOCK_SIZE;

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
