import React from "react";
import { hot } from "react-hot-loader";
import Decorate from "./components/Decorate";
import GamePad from "./components/GamePad";
import GameScene from "./components/GameScene";
import { transform } from "./utils/common";

class AppComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        };
    }
    public componentWillMount() {
        window.addEventListener("resize", this.resize.bind(this), true);
    }

    public resize() {
        this.setState({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        });
    }

    public render() {
        let filling = 0;
        const size = (() => {
            const w = this.state.w;
            const h = this.state.h;
            const ratio = h / w;
            let scale;
            let css: any = {};
            if (ratio < 1.5) {
                scale = h / 960;
            } else {
                scale = w / 640;
                filling = (h - 960 * scale) / scale / 3;
                css = {
                    paddingTop: Math.floor(filling) + 42,
                    paddingBottom: Math.floor(filling),
                    marginTop: Math.floor(-480 - filling * 1.5),
                };
            }
            css[transform] = `scale(${scale})`;
            return css;
        })();
        return (
            <div style={size} className="app">
                <div className="game">
                    <Decorate />
                    <GameScene />
                </div>
                <GamePad />
            </div>
        );
    }
}

export const App = hot(module)(AppComponent);
