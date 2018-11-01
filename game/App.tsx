import React from "react";
import { hot } from "react-hot-loader";
import { GameScene } from "./connected";

export const App = hot(module)(() => {
    return (
        <div style={{ display: "flex" }}>
            <GameScene />
        </div>
    );
});
