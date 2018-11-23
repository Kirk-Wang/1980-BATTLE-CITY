import last from "lodash/last";
import pull from "lodash/pull";
import { all, race, take } from "redux-saga/effects";
import { Input, State, TankRecord } from "../types";
import { A } from "../utils/actions";
import { directionCtrl } from "./directionCtrl";
import { sendActionToServer, whichKeyPressed } from "./server";

export function* playerContrl() {
    const pressed: string[] = [];
    const playesPressed: string[] = [];
    let currentPlayerName: string = "";
    try {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        while (true) {
            yield take(A.StartStage);
            yield all([whichKeyPressed(keyDown, keyUp), directionCtrl(getPlayerName, getPlayerInput)]);
        }
        // const result = yield race({
        //     whichKeyPressed: whichKeyPressed(keyDown, keyUp),
        //     // directionCtrl: directionCtrl(getPlayerName, getPlayerInput),
        // });
        // while (true) {
        //     yield take("xx");
        // }
        // yield all([whichKeyPressed(keyDown, keyUp), directionCtrl(getPlayerName, getPlayerInput)]);
    } finally {
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyUp);
    }

    // region function-definitions
    function trySendActionToServer(action: any) {
        const {
            payload: { code },
        } = action;
        if (!pressed.includes(code)) {
            pressed.push(code);
            sendActionToServer(action);
        }
    }

    function tryPush(direciton: Direction) {
        if (!playesPressed.includes(direciton)) {
            playesPressed.push(direciton);
        }
    }

    function keyDown(payload: any) {
        const { id, code } = payload;
        currentPlayerName = id;
        console.log(payload);
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
        const { id, code } = payload;
        currentPlayerName = id;
        console.log("keyUp");
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

    function onKeyDown(event: KeyboardEvent) {
        const code = event.code;
        trySendActionToServer({
            type: "KeyDown",
            payload: { code },
        });
    }

    function onKeyUp(event: KeyboardEvent) {
        const code = event.code;
        pull(pressed, code);
        sendActionToServer({
            type: "KeyUp",
            payload: { code },
        });
    }

    function getPlayerName() {
        return currentPlayerName;
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
