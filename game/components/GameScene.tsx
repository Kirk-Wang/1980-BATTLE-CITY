import _ from "lodash";
import React from "react";
import { State } from "../reducers";
import { BLOCK_SIZE as B } from "../utils/constants";
import { GameFieldContent } from "./GameFieldContent";
import { HUD } from "./HUD";
import { Screen } from "./Screen";
import { StageEnterCurtain } from "./StageEnterCurtain";

export class GameScene extends React.PureComponent<State> {
    public render() {
        const { game, player1, player2 } = this.props;
        const StageEnterCurtainProps = {
            t: game.stageEnterCurtainT,
            content: `stage  ${game.comingStageName}`,
        };
        const HUDProps = {
            remainingBotCount: game.remainingBots.size,
            player1,
            player2,
            show: game.showHUD,
            inMultiPlayersMode: false,
        };
        return (
            <Screen>
                <HUD {...HUDProps} />
                <GameFieldContent {...this.props} x={B} y={B} />
                <StageEnterCurtain {...StageEnterCurtainProps} />
            </Screen>
        );
    }
}
