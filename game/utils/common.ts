import { BulletRecord, EagleRecord, PowerUpRecord, TankRecord } from "../types";
import { BLOCK_SIZE, BULLET_SIZE, TANK_SIZE } from "./constants";

type UpdaterMaker = (amount: number) => (x: number) => number;
export const inc: UpdaterMaker = amount => x => x + amount;
export const dec: UpdaterMaker = amount => x => x - amount;
export const or: UpdaterMaker = amount => x => x | amount;
export const add = (x: number, y: number) => x + y;

export function getRowCol(t: number, N: number) {
    return [Math.floor(t / N), t % N];
}

const nextIdMap = new Map<string, number>();
export function getNextId(tag = "") {
    if (nextIdMap.has(tag)) {
        const nextId = nextIdMap.get(tag);
        nextIdMap.set(tag, nextId + 1);
        return nextId;
    } else {
        nextIdMap.set(tag, 2);
        return 1;
    }
}

export const frame = (x: number) => (1000 / 60) * x;

// 将BulletRecord/TankRecord/Eagle/PowerUpRecord转换为Rect类型对象
export function asRect(item: BulletRecord | TankRecord | EagleRecord | PowerUpRecord, enlargement = 0): Rect {
    if (item instanceof BulletRecord) {
        return {
            x: item.x - (BULLET_SIZE / 2) * enlargement,
            y: item.y - (BULLET_SIZE / 2) * enlargement,
            width: BULLET_SIZE * (1 + enlargement),
            height: BULLET_SIZE * (1 + enlargement),
        };
    } else if (item instanceof TankRecord) {
        return {
            x: item.x - (TANK_SIZE / 2) * enlargement,
            y: item.y - (TANK_SIZE / 2) * enlargement,
            width: TANK_SIZE * (1 + enlargement),
            height: TANK_SIZE * (1 + enlargement),
        };
    } else if (item instanceof EagleRecord) {
        return {
            x: item.x - (BLOCK_SIZE / 2) * enlargement,
            y: item.y - (BLOCK_SIZE / 2) * enlargement,
            width: BLOCK_SIZE * (1 + enlargement),
            height: BLOCK_SIZE * (1 + enlargement),
        };
    } else if (item instanceof PowerUpRecord) {
        DEV.ASSERT && console.assert(enlargement === -0.5);
        return {
            x: item.x - (BLOCK_SIZE / 2) * enlargement,
            y: item.y - (BLOCK_SIZE / 2) * enlargement,
            width: BLOCK_SIZE * (1 + enlargement),
            height: BLOCK_SIZE * (1 + enlargement),
        };
    } else {
        throw new Error("Cannot convert to type Rect");
    }
}

export function incTankLevel(tank: TankRecord) {
    if (tank.level === "basic") {
        return tank.set("level", "fast");
    } else if (tank.level === "fast") {
        return tank.set("level", "power");
    } else {
        return tank.set("level", "armor");
    }
}

/** 用来判断subject和object是否相撞 */
export function testCollide(subject: Rect, object: Rect, threshhold = 0) {
    return (
        between(subject.x - object.width, object.x, subject.x + subject.width, threshhold) &&
        between(subject.y - object.height, object.y, subject.y + subject.height, threshhold)
    );
}

export function between(min: number, value: number, max: number, threshhold = 0) {
    return min - threshhold <= value && value <= max + threshhold;
}
