import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Provider
} from "react-redux";

import store from "./app/store/store";

import Top from "./component/container/Top";

function render(): void {
    ReactDOM.render(
        <Provider store={store}>
            <Top />
        </Provider>,
        document.getElementsByClassName("main")[0]
    );
}

render();
