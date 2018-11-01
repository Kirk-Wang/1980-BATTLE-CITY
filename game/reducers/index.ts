import { List } from "immutable";
import { combineReducers } from "redux";
import { StageConfig } from "../types/StageConfig";
import { stages } from "./stages";

export interface State {
    /**
     * 这是测试状态
     */
    test?: any;
    stages: List<StageConfig>;
}

export const rootReducer = combineReducers<State>({
    test: (state = 0) => state,
    stages,
});
