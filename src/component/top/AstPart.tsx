import {
    NodeConfig
} from "inspire-tree";
import * as React from "react";

import AstTree from "./AstTree";

interface Props {
    readonly containerClassNames?: string;
    readonly rootNode?: NodeConfig;
}

const AstPart: React.SFC<Props> = props => {
    const containerClassNames = props.containerClassNames
        ? `${props.containerClassNames}`
        : "";
    return (
        <AstTree
            containerClassNames={containerClassNames}
            rootNode={props.rootNode}
        />
    );
};

export default AstPart;
