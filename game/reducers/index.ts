import { List } from "immutable";
import { combineReducers } from "redux";
import { MapRecord } from "../types";
import { StageConfig } from "../types/StageConfig";
import { map } from "./map";
import { stages } from "./stages";

export interface State {
    /**
     * 这是测试状态
     */
    test?: any;
    stages: List<StageConfig>;
    map: MapRecord;
}

export const rootReducer = combineReducers<State>({
    test: (state = 0) => state,
    stages,
    map,
});
