import {
    DocumentNode,
} from "graphql/language";
import {
    NodeConfig
} from "inspire-tree";

function documentNodeToUiTreeNode(documentNode: DocumentNode): NodeConfig {
    return gqlNodeToUiTreeNode(documentNode);
}

function gqlNodeToUiTreeNode(node: any): NodeConfig {
    if (!node || typeof node !== "object") {
        throw new Error("Node must be a object.");
    }
    if (!node.kind && !isLocation(node)) {
        console.error("Unexpected node: ", node);
        return {
            text: "[Bug] Unexpected"
        };
    };
    const uiNode = Object.entries(node).reduce((n, entry) => {
        const [key, value] = entry;
        if (key === "source" || key === "startToken" || key === "endToken") {
            return n;
        }
        if (key === "kind") {
            return Object.assign({}, n, { text: value });
        }
        if (Array.isArray(value)) {
            const child = {
                text: key,
                children: value.map(gqlNodeToUiTreeNode)
            };
            const children = Array.isArray(n.children) ? n.children : [] as NodeConfig[];
            children.push(child);
            return Object.assign({}, n, { children });
        } else if (typeof value === "string") {
            const child = {
                text: `${key}: ${value}`
            };
            const children = Array.isArray(n.children) ? n.children : [] as NodeConfig[];
            children.push(child);
            return Object.assign({}, n, { children });
        } else if (value !== null && typeof value === "object") {
            const { children: existingChildren } = n;
            const child = gqlNodeToUiTreeNode(value);
            const children = Array.isArray(n.children) ? n.children : [] as NodeConfig[];
            children.push(child);
            return Object.assign({}, n, { children });
        }
        return n;
    }, { text: "" } as NodeConfig);
    if (isLocation(node)) {
        const { start, end } = node;
        const children = [
            {
                text: `start: ${start}`
            },
            {
                text: `end: ${end}`
            }
        ];
        return Object.assign({}, uiNode, {
            text: "Location",
            children
        });
    }
    if (!hasChildren(node)) {
        return Object.assign({}, uiNode, { children: uiNode });
    }
    return uiNode;
}

function isLocation(node: any): boolean {
    return typeof node.start === "number"
        && typeof node.end === "number";
}

function hasChildren(node: any): boolean {
    if (typeof node !==  "object") {
        return false;
    }
    return Object.values(node).reduce((hasChildren, v) =>
        hasChildren || typeof v === "object"
    , false) as boolean;
}

export default documentNodeToUiTreeNode;
