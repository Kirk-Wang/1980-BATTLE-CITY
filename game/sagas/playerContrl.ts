import last from "lodash/last";
import pull from "lodash/pull";
import { all } from "redux-saga/effects";
import { Input, TankRecord } from "../types";
import directionController from "./directionController";
import { whichKeyPressed } from "./server";

export function* playerContrl(playerName: string, tankId: TankId) {
    const playesPressed: string[] = [];
    try {
        yield all([whichKeyPressed(playerName, keyDown, keyUp), directionController(tankId, getPlayerInput)]);
    } finally {
        // console.log("xxx");
    }

    function tryPush(direciton: Direction) {
        if (!playesPressed.includes(direciton)) {
            playesPressed.push(direciton);
        }
    }

    function keyDown(payload: any) {
        const { code } = payload;
        if (code === "KeyJ") {
            // firePressing = true;
            // firePressed = true;
        } else if (code === "KeyA") {
            tryPush("left");
        } else if (code === "KeyD") {
            tryPush("right");
        } else if (code === "KeyW") {
            tryPush("up");
        } else if (code === "KeyS") {
            tryPush("down");
        }
    }

    function keyUp(payload: any) {
        const { code } = payload;
        if (code === "KeyJ") {
            // firePressing = false;
        } else if (code === "KeyA") {
            pull(playesPressed, "left");
        } else if (code === "KeyD") {
            pull(playesPressed, "right");
        } else if (code === "KeyW") {
            console.log("KeyW");
            pull(playesPressed, "up");
        } else if (code === "KeyS") {
            pull(playesPressed, "down");
        }
    }

    // 调用该函数来获取当前用户的移动操作(坦克级别)
    function getPlayerInput(tank: TankRecord): Input {
        const direction = playesPressed.length > 0 ? last(playesPressed) : null;
        if (direction != null) {
            if (direction !== tank.direction) {
                return { type: "turn", direction } as Input;
            } else {
                return { type: "forward" };
            }
        }
    }
}
