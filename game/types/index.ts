export { MapRecord } from "./MapRecord";
export { EagleRecord } from "./EagleRecord";
export { StageConfig } from "./StageConfig";

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

    type TankLevel = "basic" | "fast" | "power" | "armor";

    type AreaId = number;
}
