import { MapRecord } from "../types";
import { A, Action } from "../utils/actions";

const initState = new MapRecord({ eagle: null });

export function map(state = initState, action: Action) {
    // 加载地图
    if (action.type === A.LoadStageMap) {
        return action.stage.map;
    } else {
        return state;
    }
}
