import pull from "lodash/pull";
import { take } from "redux-saga/effects";
import { A } from "../utils/actions";
import { store } from "../utils/store";
import { getSessionId, sendActionToServer } from "./server";

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

    function getTank(code: string) {
        let tank = null;
        // 开火不用关心
        if (code !== "KeyJ") {
            const { tanks, players }: any = store.getState();
            const player = players[getSessionId()];
            tank = tanks.get(player.activeTankId).toObject();
        }
        return tank;
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
        let payload: any = { code };
        pull(pressed, code);
        // 当前的玩家 tank 还需要同步，防止不同端的坦克状态不对
        const tank = getTank(code);
        if (tank) {
            payload = { code, tank };
        }
        sendActionToServer({
            type: "KeyUp",
            payload,
        });
    }
}
