import pull from "lodash/pull";
import { take } from "redux-saga/effects";
import { A } from "../utils/actions";
import { sendActionToServer } from "./server";

export function* clientCtrl() {
    const pressed: string[] = [];
    try {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        while (true) {
            yield take(A.StartStage);
        }
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
}
