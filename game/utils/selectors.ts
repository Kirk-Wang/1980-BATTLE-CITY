import { State } from "../reducers";

export const player = (state: State, playerName: PlayerName) => {
    return playerName === "player-1" ? state.player1 : state.player2;
};
