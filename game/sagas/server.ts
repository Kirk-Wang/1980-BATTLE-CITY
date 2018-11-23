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
    const client = new Colyseus.Client("ws://172.25.176.80:3338");
    room = client.join("battle");
    room.onJoin.add(() => {
        console.log(client.id, "joined", room.name);
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
                    yield* handlePlayers(payload);
                    break;
                case "KeyDown":
                    handlePressed[payload.id].keyDown(payload);
                    break;
                case "KeyUp":
                    handlePressed[payload.id].keyUp(payload);
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

export function sendActionToServer(action: any) {
    room.send(action);
}
