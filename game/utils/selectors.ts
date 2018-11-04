import _ from "lodash";
import { State } from "../reducers";
import { asRect, testCollide } from "./common";
import { BLOCK_SIZE as B, TANK_SIZE } from "./constants";

export const player = (state: State, playerName: PlayerName) => {
    return playerName === "player-1" ? state.player1 : state.player2;
};

export const availableSpawnPosition = (state: State): Rect => {
    const result: Rect[] = [];
    const aliveTanks = state.tanks.filter(t => t.alive);
    outer: for (const x of [0, 6 * B, 12 * B]) {
        const option = { x, y: 0, width: TANK_SIZE, height: TANK_SIZE };
        for (const tank of aliveTanks.values()) {
            if (testCollide(option, asRect(tank))) {
                continue outer;
            }
        }
        result.push(option);
    }
    return _.sample(result);
};
