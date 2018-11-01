import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";
import { BrickLayer } from "./BrickLayer";
import { SteelLayer } from "./SteelLayer";

export class GameFieldContent extends React.PureComponent<Partial<State & Point>> {
    public render() {
        const { x = 0, y = 0, map } = this.props;
        const { steels, bricks } = map.toObject();
        return (
            <g className="battle-field" transform={`translate(${x},${y})`}>
                <rect width={13 * B} height={13 * B} fill="#000000" />
                <SteelLayer steels={steels} />
                <BrickLayer bricks={bricks} />
            </g>
        );
    }
}
