import {
    NodeConfig
} from "inspire-tree";

import getReturnType from "../util/getReturnType";

const CHANGE_SOURCE = "CHANGE_SOURCE";
const UPDATE_TREE = "UPDATE_TREE";

export function changeSource(sourceBody: string, ast?: NodeConfig) {
    return {
        type: CHANGE_SOURCE as typeof CHANGE_SOURCE,
        payload: {
            sourceBody,
            ast
        }
    };
}

export function updateTree() {
    return {
        type: UPDATE_TREE as typeof UPDATE_TREE
    };
}

const ChangeSourceAction = getReturnType(changeSource);
const UpdateTreeAction = getReturnType(updateTree);

type TopAction = typeof ChangeSourceAction | typeof UpdateTreeAction;

export type TopState = {
    sourceBody: string,
    ast?: NodeConfig
};

const initialState: TopState = {
    sourceBody: "",
    ast: undefined
};

export default function reduceTop(state: TopState = initialState, action: TopAction): TopState {
    if (action.type === CHANGE_SOURCE) {
        const { sourceBody, ast } = action.payload;
        return Object.assign({}, state, { sourceBody, ast });
    }
    return state;
}
