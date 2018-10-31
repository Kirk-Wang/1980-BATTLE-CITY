import { combineReducers } from "redux";

export interface State {
    /**
     * 这是测试状态
     */
    test?: any;
}

export const rootReducer = combineReducers<State>({
    test: (state = 0) => state,
});
