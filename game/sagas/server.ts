import * as Colyseus from "colyseus.js";
import { eventChannel } from "redux-saga";

let channnel: any;
let room: any;
export function serverChannel() {
    if (channnel) {
        return channnel;
    }
    const client = new Colyseus.Client("ws://localhost:3333");
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
