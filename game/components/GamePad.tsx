import Immutable from "immutable";
import pull from "lodash/pull";
import React from "react";
import { sendActionToServer } from "../sagas/server";
import { getSessionId } from "../sagas/server";
import { store } from "../utils/store";
import Button from "./GamePadButton";

const pressed: string[] = [];

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

function onKeyDown(event: any) {
    const code = event.code;
    trySendActionToServer({
        type: "KeyDown",
        payload: { code },
    });
}

function onKeyUp(event: any) {
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

export default class Keyboard extends React.Component<any, any> {
    public domUp: Button;
    public domDown: Button;
    public domLeft: Button;
    public domRight: Button;
    public domFire: Button;
    public componentDidMount() {
        const touchEventCatch: any = {}; // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

        // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
        const mouseDownEventCatch: any = {};

        document.addEventListener(
            "contextmenu",
            e => {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            },
            true,
        );
        document.addEventListener(
            "touchstart",
            e => {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            },
            true,
        );

        document.addEventListener(
            "mousedown",
            e => {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            },
            true,
        );

        const todo: any = {
            Up: {
                down: () => {
                    console.log("Up-KeyDown");
                    onKeyDown({ code: "KeyW" });
                },
                up: () => {
                    console.log("Up-KeyUp");
                    onKeyUp({ code: "KeyW" });
                },
            },
            Down: {
                down: () => {
                    console.log("Down-KeyDown");
                    onKeyDown({ code: "KeyS" });
                },
                up: () => {
                    console.log("Down-KeyUp");
                    onKeyUp({ code: "KeyS" });
                },
            },
            Left: {
                down: () => {
                    console.log("Left-KeyDown");
                    onKeyDown({ code: "KeyA" });
                },
                up: () => {
                    console.log("Left-KeyUp");
                    onKeyUp({ code: "KeyA" });
                },
            },
            Right: {
                down: () => {
                    console.log("Right-KeyDown");
                    onKeyDown({ code: "KeyD" });
                },
                up: () => {
                    console.log("Right-KeyUp");
                    onKeyUp({ code: "KeyD" });
                },
            },
            Fire: {
                down: () => {
                    console.log("Fire-KeyDown");
                    onKeyDown({ code: "KeyJ" });
                },
                up: () => {
                    console.log("Fire-KeyUp");
                    onKeyUp({ code: "KeyJ" });
                },
            },
        };

        Object.keys(todo).forEach((key: any) => {
            this[`dom${key}`].dom.addEventListener(
                "mousedown",
                () => {
                    if (touchEventCatch[key] === true) {
                        return;
                    }
                    todo[key].down();
                    mouseDownEventCatch[key] = true;
                },
                true,
            );
            this[`dom${key}`].dom.addEventListener(
                "mouseup",
                () => {
                    if (touchEventCatch[key] === true) {
                        touchEventCatch[key] = false;
                        return;
                    }
                    todo[key].up();
                    mouseDownEventCatch[key] = false;
                },
                true,
            );
            this[`dom${key}`].dom.addEventListener(
                "mouseout",
                () => {
                    if (mouseDownEventCatch[key] === true) {
                        todo[key].up();
                    }
                },
                true,
            );
            this[`dom${key}`].dom.addEventListener(
                "touchstart",
                () => {
                    touchEventCatch[key] = true;
                    todo[key].down();
                },
                true,
            );
            this[`dom${key}`].dom.addEventListener(
                "touchend",
                () => {
                    todo[key].up();
                },
                true,
            );
        });
    }
    public shouldComponentUpdate({ keyboard, filling }: any) {
        return !Immutable.is(keyboard, this.props.keyboard) || filling !== this.props.filling;
    }
    public render() {
        // const keyboard = this.props.keyboard;
        return (
            <div
                className={"keyboard"}
                style={{
                    marginTop: 20 + this.props.filling,
                }}
            >
                <Button
                    color="blue"
                    size="s1"
                    top={0}
                    left={374 - 250}
                    label={"up"}
                    arrow="translate(0, 63px)"
                    position={true}
                    active={false}
                    ref={c => {
                        this.domUp = c;
                    }}
                />
                <Button
                    color="blue"
                    size="s1"
                    top={180}
                    left={374 - 250}
                    label={"down"}
                    arrow="translate(0,-71px) rotate(180deg)"
                    active={false}
                    ref={c => {
                        this.domDown = c;
                    }}
                />
                <Button
                    color="blue"
                    size="s1"
                    top={90}
                    left={284 - 250}
                    label={"left"}
                    arrow="translate(60px, -12px) rotate(270deg)"
                    active={false}
                    ref={c => {
                        this.domLeft = c;
                    }}
                />
                <Button
                    color="blue"
                    size="s1"
                    top={90}
                    left={464 - 250}
                    label={"right"}
                    arrow="translate(-60px, -12px) rotate(90deg)"
                    active={false}
                    ref={c => {
                        this.domRight = c;
                    }}
                />
                <Button
                    color="red"
                    size="s0"
                    top={60}
                    left={374}
                    label={`FIRE`}
                    active={false}
                    ref={c => {
                        this.domFire = c;
                    }}
                />
            </div>
        );
    }
}
