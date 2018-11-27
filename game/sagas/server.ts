import delay from "@redux-saga/delay-p";
import * as Colyseus from "colyseus.js";
import { combineReducers } from "redux";
import { eventChannel } from "redux-saga";
import { call, fork, put, select, take } from "redux-saga/effects";
import { createReducer } from "../reducers";
import { playerReducerFactory } from "../reducers/players";
import { createPlayerConfig } from "../utils/constants";
import { store } from "../utils/store";
import playerSaga from "./playerSaga";

let channnel: any;
let room: any;
let client: any;
export function serverChannel() {
    if (channnel) {
        return channnel;
    }
    const host = window.document.location.host.replace(/:.*/, "");
    client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + ":3338");
    // const client = new Colyseus.Client("ws://localhost:3338");
    room = client.join("battle");
    room.onJoin.add(() => {
        console.log(client.id, "joined", room.name);
        console.log(room);
    });
    channnel = eventChannel(emit => {
        room.listen("players/:id", (change: any) => {
            emit({ type: "Players", payload: change });
        });
        room.onMessage.add(function(action: any) {
            emit(action);
        });
        return () => {
            console.log("clear");
        };
    });
    return channnel;
}

const handlePressed: any = {};
export function whichKeyPressed(playerName: string, keyDown: (...args: any) => any, keyUp: (...args: any) => any) {
    handlePressed[playerName] = {
        keyDown,
        keyUp,
    };
}

export function* connectServer() {
    try {
        const players: any = {};
        const tasks: any = {};
        let playerIndex = 0;
        while (true) {
            const action = yield take(serverChannel());
            const { type, payload } = action;
            switch (type) {
                case "Players":
                    if (playerIndex > 7) {
                        continue;
                    }
                    if (tasks[payload.id]) {
                        continue;
                    }
                    yield* handlePlayers(payload);
                    break;
                case "KeyDown":
                    handlePressed[payload.id].keyDown(payload);
                    break;
                case "KeyUp":
                    handlePressed[payload.id].keyUp(payload);
                    yield call(delay, 0); // 让 KeyUp State 设置完毕
                    yield* syncPlayerTanks(payload);
                    break;
                case "SYNC":
                    yield* handleFixPlayersTank(payload);
                    break;
            }
        }

        function* handleFixPlayersTank({ id, tank }: any) {
            const sessionId = getSessionId();
            // 自己不用修复
            if (id !== sessionId) {
                const { players }: any = yield select(state => state);
                const player = players[id];
                // 拿到玩家在当前 client 的 id
                tank.tankId = player.activeTankId;
                yield put({
                    type: "SyncPlayerTank",
                    tank,
                });
            }
        }

        function* handlePlayers(payload: any) {
            const {
                operation,
                path: { id },
            } = payload;
            if (operation === "add") {
                // replaceReducer
                players[id] = playerReducerFactory(id);
                const reducer = createReducer(combineReducers({ ...players }));
                store.replaceReducer(reducer);
                tasks[id] = yield fork(playerSaga, id, createPlayerConfig(playerIndex));
                playerIndex++;
            }
        }

        // fix client state
        function* syncPlayerTanks({ code, id }: any) {
            const sessionId = getSessionId();
            if (code !== "KeyJ" && id === sessionId) {
                const { tanks, players }: any = yield select(state => state);
                const player = players[getSessionId()];
                const tank = tanks.get(player.activeTankId);
                sendActionToServer({
                    type: "SYNC",
                    payload: {
                        tank: tank.toObject(),
                    },
                });
            }
        }
    } finally {
        console.log("finally");
        // console.log
    }
}

export function sendActionToServer(action: any) {
    room.send(action);
}

export const getSessionId = () => room.sessionId;
