import Immutable from "immutable";
import React from "react";

// import todo from "../../control/todo";
// import store from "../../store";
// import { i18n, lan } from "../../unit/const";
import Button from "./GamePadButton";
// import style from "./index.less";

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

        const todo: any = {};

        Object.keys(todo).forEach((key: any) => {
            this[`dom_${key}`].dom.addEventListener(
                "mousedown",
                () => {
                    if (touchEventCatch[key] === true) {
                        return;
                    }
                    // todo[key].down(store);
                    mouseDownEventCatch[key] = true;
                },
                true,
            );
            this[`dom_${key}`].dom.addEventListener(
                "mouseup",
                () => {
                    if (touchEventCatch[key] === true) {
                        touchEventCatch[key] = false;
                        return;
                    }
                    // todo[key].up(store);
                    mouseDownEventCatch[key] = false;
                },
                true,
            );
            this[`dom_${key}`].dom.addEventListener(
                "mouseout",
                () => {
                    if (mouseDownEventCatch[key] === true) {
                        // todo[key].up(store);
                    }
                },
                true,
            );
            this[`dom_${key}`].dom.addEventListener(
                "touchstart",
                () => {
                    touchEventCatch[key] = true;
                    // todo[key].down(store);
                },
                true,
            );
            this[`dom_${key}`].dom.addEventListener(
                "touchend",
                () => {
                    // todo[key].up(store);
                },
                true,
            );
        });
    }
    public shouldComponentUpdate({ keyboard, filling }: any) {
        return !Immutable.is(keyboard, this.props.keyboard) || filling !== this.props.filling;
    }
    public render() {
        const keyboard = this.props.keyboard;
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
                    left={374}
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
                    left={374}
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
                    left={284}
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
                    left={464}
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
                    left={52}
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
