import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { Screen } from "./Screen";

export class GameScene extends React.PureComponent<State> {
    public render() {
        return (
            <Screen>
                <text>hahah</text>
            </Screen>
        );
    }
}
