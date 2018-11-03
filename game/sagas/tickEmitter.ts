import ReactDOM from "react-dom";
import { eventChannel } from "redux-saga";
// tslint:disable-next-line:no-submodule-imports
import { put, take } from "redux-saga/effects";
import * as actions from "../utils/actions";

export interface TickEmitterOptions {
    maxFPS?: number;
    bindESC?: boolean;
    slow?: number;
}

export function* tickEmitter(options: TickEmitterOptions = {}) {
    const { slow = 1, maxFPS = Infinity } = options;

    const tickChannel = eventChannel<actions.Tick>(emit => {
        let lastTime = performance.now();
        let requestId = requestAnimationFrame(emitTick);

        function emitTick() {
            const now = performance.now();
            ReactDOM.unstable_batchedUpdates(emit, actions.tick(now - lastTime));
            lastTime = now;
            requestId = requestAnimationFrame(emitTick);
        }

        return () => cancelAnimationFrame(requestId);
    });

    try {
        let accumulation = 0;
        while (true) {
            const { delta }: actions.Tick = yield take(tickChannel);
            accumulation += delta;
            if (accumulation > 1000 / maxFPS) {
                // console.log(
                //     `delta:${delta}-accumulation:${accumulation}-slow:${slow}-accumulation / slow:${accumulation /
                //         slow}`,
                // );
                yield put(actions.tick(accumulation / slow));
                yield put(actions.afterTick(accumulation / slow));
                accumulation = 0;
            }
        }
    } finally {
        tickChannel.close();
    }
}
