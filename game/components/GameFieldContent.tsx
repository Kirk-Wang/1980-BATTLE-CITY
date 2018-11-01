import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";

export class GameFieldContent extends React.PureComponent<Partial<State & Point>> {
    public render() {
        const { x = 0, y = 0 } = this.props;
        return (
            <g className="battle-field" transform={`translate(${x},${y})`}>
                <rect width={13 * B} height={13 * B} fill="#000000" />
            </g>
        );
    }
}
