import {
    combineReducers
} from "redux";

import reduceTop, {
    TopState
} from "../top/top";

export type State = {
    top: TopState
};

const rootReducer = combineReducers<State>({
    top: reduceTop
});

export default rootReducer;
