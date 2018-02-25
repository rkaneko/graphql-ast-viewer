import {
    createStore
} from "redux";
import {
    devToolsEnhancer
} from "redux-devtools-extension/developmentOnly";

import rootReducer, {
    State
} from "./rootReducer";

const store = createStore<State>(
    rootReducer,
    devToolsEnhancer({
        name: "GraphQLAstViewer"
    })
);

export default store;
