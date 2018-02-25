import {
    DocumentNode,
    parse,
    Source
} from "graphql/language";

function sourceToDocumentNode(source: Source): DocumentNode {
    return parse(source);
}

export default sourceToDocumentNode;
