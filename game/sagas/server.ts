import * as Colyseus from "colyseus.js";
import { combineReducers } from "redux";
import { eventChannel } from "redux-saga";
import { call, fork, take } from "redux-saga/effects";
import { createReducer } from "../reducers";
import { playerReducerFactory } from "../reducers/players";
import { createPlayerConfig, PLAYER_CONFIGS } from "../utils/constants";
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
            emit({ type: "Players", payload: change });
        });
        return () => {
            console.log("clear");
        };
    });
    return channnel;
}

export function* initalPlayers() {
    try {
        const players: any = {};
        const tasks: any = {};
        let index = 0;
        while (true) {
            const action = yield take(serverChannel());
            console.log(action);
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
    } finally {
        // console.log()
    }
}

export function sendMsgToServer(action: any) {
    room.send(action);
}

export function* fetchServerAction(action: any) {
    // 向服务器发送 action 请求
    sendMsgToServer(action);
    // 等待 server 响应
    while (true) {
        const msg = yield take(serverChannel());
        if (action.type === msg.type) {
            return action;
        }
    }
}
