import {
    Source
} from "graphql/language";
import {
    NodeConfig
} from "inspire-tree";

import store from "../../store/store";
import {
    changeSource
} from "../../top/top";
import documentNodeToUiTreeNode from "../../ast/documentNodeToUiTreeNode";
import sourceToDocumentNode from "../../ast/sourceToDocumentNode";

function changeSourceInput(input: string): void {
    if (!input) {
        const ast = undefined;
        store.dispatch(changeSource(input, ast));
        return;
    }
    const source = new Source(input);
    try {
        const documentNode = sourceToDocumentNode(source);
        const ast = documentNodeToUiTreeNode(documentNode);
        store.dispatch(changeSource(input, ast));
    } catch (err) {
        // TODO dispatch error
        store.dispatch(changeSource(input, undefined));
    }
}

export default changeSourceInput;
