export { MapRecord } from "./MapRecord";
export { EagleRecord } from "./EagleRecord";
export { StageConfig } from "./StageConfig";
export { PlayerRecord } from "./PlayerRecord";
export { TankRecord } from "./TankRecord";
export { BulletRecord } from "./BulletRecord";
export { PowerUpRecord } from "./PowerUpRecord";
export { FlickerRecord } from "./FlickerRecord";

export interface PlayerConfig {
    color: TankColor;
    control: {
        fire: string;
        up: string;
        down: string;
        left: string;
        right: string;
    };
    spawnPos: Point;
}

type TankColor = "green" | "yellow" | "silver" | "red" | "auto";

declare global {
    interface Rect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface Point {
        x: number;
        y: number;
    }

    type PowerUpName = "tank" | "star" | "grenade" | "timer" | "helmet" | "shovel";

    type TankLevel = "basic" | "fast" | "power" | "armor";
    type TankColor = "green" | "yellow" | "silver" | "red" | "auto";

    type AreaId = number;
    type BulletId = number;
    type TankId = number;
    type PowerUpId = number;
    type FlickerId = number;

    type PlayerName = "player-1" | "player-2";

    type FlickerShape = 0 | 1 | 2 | 3;

    type Side = "player" | "bot";

    type Direction = "up" | "down" | "left" | "right";
}
