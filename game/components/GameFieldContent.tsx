import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";
import { BrickLayer } from "./BrickLayer";
import RestrictedAreaLayer from "./dev-only/RestrictedAreaLayer";
import { Eagle } from "./Eagle";
import { Flicker } from "./Flicker";
import { SteelLayer } from "./SteelLayer";
import { Tank } from "./tank";
import TankHelmet from "./TankHelmet";

export class GameFieldContent extends React.PureComponent<Partial<State & Point>> {
    public render() {
        const { x = 0, y = 0, map, tanks, flickers } = this.props;
        const { steels, bricks, eagle, restrictedAreas } = map.toObject();
        const aliveTanks = tanks.filter(t => t.alive);
        return (
            <g className="battle-field" transform={`translate(${x},${y})`}>
                <rect width={13 * B} height={13 * B} fill="#000000" />
                <SteelLayer steels={steels} />
                <BrickLayer bricks={bricks} />
                {eagle ? <Eagle x={eagle.x} y={eagle.y} broken={eagle.broken} /> : null}
                <g className="tank-layer">
                    {aliveTanks
                        .map(tank => <Tank key={tank.tankId} tank={tank} showReservedIndicator={true} />)
                        .valueSeq()}
                </g>
                <g className="helmet-layer">
                    {aliveTanks
                        .map(
                            tank =>
                                tank.helmetDuration > 0 ? <TankHelmet key={tank.tankId} x={tank.x} y={tank.y} /> : null,
                        )
                        .valueSeq()}
                </g>
                <RestrictedAreaLayer areas={restrictedAreas} />
                <g className="flicker-layer">
                    {flickers.map(flicker => <Flicker key={flicker.flickerId} flicker={flicker} />).valueSeq()}
                </g>
            </g>
        );
    }
}
