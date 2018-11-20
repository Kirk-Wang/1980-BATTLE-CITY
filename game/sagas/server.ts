import * as Colyseus from "colyseus.js";
import { eventChannel } from "redux-saga";
import { take } from "redux-saga/effects";

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
        room.onMessage.add((action: any) => {
            console.log(action);
            emit(action);
        });
        return () => {
            console.log("clear");
        };
    });
    return channnel;
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
