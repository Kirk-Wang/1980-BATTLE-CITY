import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";
import { GameFieldContent } from "./GameFieldContent";
import { Screen } from "./Screen";

export class GameScene extends React.PureComponent<State> {
    public render() {
        return (
            <Screen>
                <GameFieldContent {...this.props} x={B} y={B} />
            </Screen>
        );
    }
}
