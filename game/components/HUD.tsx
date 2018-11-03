import React from "react";
import { PlayerRecord } from "../types/PlayerRecord";
import { BLOCK_SIZE as B, FIELD_SIZE } from "../utils/constants";
import { BotCountIndicator } from "./BotCountIndicator";
import { PlayerTankThumbnail } from "./icons";
import Text from "./Text";

interface HUDContentProps {
    x?: number;
    y?: number;
    remainingBotCount: number;
    player1: PlayerRecord;
    player2: PlayerRecord;
    show: boolean;
    inMultiPlayersMode: boolean;
}

export class HUDContent extends React.PureComponent<HUDContentProps> {
    public renderPlayer1Info() {
        const { player1 } = this.props;
        return (
            <g className="player-1-info">
                <Text x={0} y={0} content={"\u2160P"} fill="#000000" />
                <PlayerTankThumbnail x={0} y={0.5 * B} />
                <Text x={0.5 * B} y={0.5 * B} content={String(player1.lives)} fill="#000000" />
            </g>
        );
    }

    public renderPlayer2Info() {
        const { player2 } = this.props;
        const transform = `translate(0, ${B})`;
        return (
            <g className="player-2-info" transform={transform}>
                <Text x={0} y={0} content={"\u2161P"} fill="#000000" />
                <PlayerTankThumbnail x={0} y={0.5 * B} />
                <Text x={0.5 * B} y={0.5 * B} content={String(player2.lives)} fill="#000000" />
            </g>
        );
    }

    public render() {
        const { remainingBotCount, show, x = 0, y = 0, inMultiPlayersMode } = this.props;
        return (
            <g className="HUD" display={show ? "inline" : "none"} transform={`translate(${x}, ${y})`}>
                <BotCountIndicator count={remainingBotCount} />
                <g transform={`translate(0, ${6 * B})`}>
                    {this.renderPlayer1Info()}
                    {inMultiPlayersMode && this.renderPlayer2Info()}
                </g>
            </g>
        );
    }
}

export const HUD = (props: HUDContentProps) => <HUDContent x={FIELD_SIZE + 1.5 * B} y={1.5 * B} {...props} />;
