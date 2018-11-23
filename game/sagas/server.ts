import * as Colyseus from "colyseus.js";
import { combineReducers } from "redux";
import { eventChannel } from "redux-saga";
import { fork, take } from "redux-saga/effects";
import { createReducer } from "../reducers";
import { playerReducerFactory } from "../reducers/players";
import { createPlayerConfig } from "../utils/constants";
import { store } from "../utils/store";
import playerSaga from "./playerSaga";

let channnel: any;
let room: any;
export function serverChannel() {
    if (channnel) {
        return channnel;
    }
    const client = new Colyseus.Client("ws://localhost:3338");
    room = client.join("battle");
    room.onJoin.add(() => {
        console.log(client.id, "joined", room.name);
    });
    channnel = eventChannel(emit => {
        room.listen("players/:id", (change: any) => {
            console.log(change);
            emit({ type: "Players", payload: change });
        });
        room.onMessage.add(function(action: any) {
            console.log(action);
            emit(action);
        });
        return () => {
            console.log("clear");
        };
    });
    return channnel;
}

let handleKeyDown: (...args: any) => any;
let handleKeyUp: (...args: any) => any;
export function whichKeyPressed(keydown: any, keyup: any) {
    handleKeyDown = keydown;
    handleKeyUp = keyup;
}

export function* connectServer() {
    try {
        const players: any = {};
        const tasks: any = {};
        let playerIndex = 0;
        while (true) {
            console.log("tasks");
            const action = yield take(serverChannel());
            console.log(action);
            const { type, payload } = action;
            switch (type) {
                case "Players":
                    yield* handlePlayers(payload);
                    break;
                case "KeyDown":
                    handleKeyDown(payload);
                    break;
                case "KeyUp":
                    handleKeyUp(payload);
                    break;
            }
        }
        function* handlePlayers(payload: any) {
            const {
                operation,
                path: { id },
            } = payload;
            console.log("handlePlayers");
            if (operation === "add") {
                // replaceReducer
                players[id] = playerReducerFactory(id);
                const reducer = createReducer(combineReducers({ ...players }));
                store.replaceReducer(reducer);
                tasks[id] = yield fork(playerSaga, id, createPlayerConfig(playerIndex));
                playerIndex++;
            }
        }
    } finally {
        console.log("finally");
        // console.log
    }
}

export function* initalPlayers() {
    try {
        yield fork(function*() {
            const players: any = {};
            const tasks: any = {};
            let index = 0;
            while (true) {
                const action = yield take(serverChannel());
                console.log("initalPlayers", action);
                // 是对玩家的操作
                if (action.type === "Players") {
                    const {
                        payload: {
                            operation,
                            path: { id },
                        },
                    } = action;
                    if (operation === "add") {
                        // replaceReducer
                        players[id] = playerReducerFactory(id);
                        const reducer = createReducer(combineReducers({ ...players }));
                        store.replaceReducer(reducer);
                        console.log(index);
                        console.log(players);
                        tasks[id] = yield fork(playerSaga, id, createPlayerConfig(index));
                        index++;
                    }
                }
            }
        });
    } finally {
        // console.log()
    }
}

export function sendActionToServer(action: any) {
    room.send(action);
}

export function* fetchServerAction(action: any) {
    // 向服务器发送 action 请求
    sendActionToServer(action);
    // 等待 server 响应
    while (true) {
        const msg = yield take(serverChannel());
        if (action.type === msg.type) {
            return action;
        }
    }
}
