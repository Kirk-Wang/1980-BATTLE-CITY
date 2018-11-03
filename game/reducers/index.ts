import { List } from "immutable";
import { combineReducers } from "redux";
import { MapRecord, PlayerRecord } from "../types";
import { StageConfig } from "../types/StageConfig";
import { A, Action } from "../utils/actions";
import { game, GameRecord } from "./game";
import { map } from "./map";
import { player1, player2 } from "./players";
import { stages } from "./stages";
import { tanks, TanksMap } from "./tanks";

export interface State {
    /**
     * 这是测试状态
     */
    test?: any;
    game: GameRecord;
    stages: List<StageConfig>;
    map: MapRecord;
    player1: PlayerRecord;
    player2: PlayerRecord;
    tanks: TanksMap;
    time: number;
}

export function time(state = 0, action: Action) {
    if (action.type === A.Tick) {
        return state + action.delta;
    } else {
        return state;
    }
}

export const rootReducer = combineReducers<State>({
    test: (state = 0) => state,
    stages,
    map,
    player1,
    player2,
    tanks,
    game,
    time,
});
