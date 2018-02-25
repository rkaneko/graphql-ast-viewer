import InspireTree, {
    NodeConfig,
    TreeNode,
    TreeNodes
} from "inspire-tree";
import * as React from "react";
import uuidv4 from "uuid/v4";

interface Props {
    readonly containerClassNames?: string;
    readonly rootNode?: NodeConfig;
}

interface State {
    readonly treeNodes: TreeNodes
}

function createTree(data: NodeConfig[], applyChanges: () => void): InspireTree {
    const tree = new InspireTree({
        data,
        renderer: () => {
            let batching = 0;
            return {
                applyChanges,
                attach: () => {
                    console.log("attach", batching); 
                },
                batch: () => {
                    console.log("batch", batching);
                    batching++;
                },
                end: () => {
                    console.log("end", batching);
                    batching--;
                    if (batching === 0) {
                        if (typeof applyChanges === "function") {
                            applyChanges();
                        }
                    }
                }
            }
        }
    });
    tree.on("changes.applied", (evt: React.SyntheticEvent<HTMLElement>, treeNode: TreeNode) => {
        applyChanges();
    });
    return tree;
}

const ToggleView: React.SFC<{
    tree: TreeNode
}> = props => {
    if (!props.tree.hasChildren()) {
        return null;
    }
    
    const onClick = (evt: React.SyntheticEvent<HTMLElement>) => {
        props.tree.toggleCollapse();
    };
    return (
        <a
            className={props.tree.expanded() ? "collapsed" : "expanded"}
            onClick={onClick}
        >
        {props.tree.expanded() ? " - " : " + "}
        </a>
    );
};

const NodeView: React.SFC<{
    tree: TreeNode
}> = props => {
    if (!props.tree.available()) {
        return null;
    }
    const nodeChildren = props.tree.expanded()
        && props.tree.hasChildren()
        ? <TreeView treeNodes={props.tree.getChildren()} />
        : null;
    const classes = {
        expanded: props.tree.expanded(),
        directory: !!props.tree.getChildren(),
        file: !props.tree.getChildren(),
        selected: props.tree.selected()
    };
    const listClassNames = Object.entries(classes).reduce((classNames, entry) => {
        const [key, value] = entry;
        if (value) {
            return classNames.length === 0 ? `${key}` : `${classNames} ${key}`;
        }
        return classNames;
    }, "");
    return (
        <li
            className={listClassNames}
            key={props.tree.tree().id}
        >
            <div>
                <ToggleView tree={props.tree} />
                <a
                    className={props.tree.hasChildren() ? "directory" : "file"}
                    onClick={props.tree.toggleSelect.bind(props.tree)}
                >
                    {props.tree.toString()}
                </a>
            </div>
            <div>
                {nodeChildren}
            </div>
        </li>
    );
};

const TreeView: React.SFC<{
    treeNodes: TreeNodes
}> = props => {
    return (
        <ol key={uuidv4()}>
        {
            props.treeNodes.map(treeNode => {
                return <NodeView key={uuidv4()} tree={treeNode} />;
            })
        }
        </ol>
    );
};

class AstTree extends React.Component<Props, State> {
    private readonly treeContainerClassName: string;
    private readonly applyChanges: () => void;
    private tree?: InspireTree;
    constructor(props: Props) {
        super(props);
        this.treeContainerClassName = "top-AstTree_container";
        this.applyChanges = this.syncNodes.bind(this);
        this.tree = createTree(
            this.props.rootNode ? [this.props.rootNode] : [],
            this.applyChanges
        );
        this.state = {
            treeNodes: this.tree.nodes()
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.tree = createTree(
            nextProps.rootNode ? [nextProps.rootNode] : [],
            this.applyChanges
        );
        this.setState({
            treeNodes: this.tree.nodes()
        });
    }

    render() {
        const containerClassNames = this.props.containerClassNames
            ? `${this.treeContainerClassName} ${this.props.containerClassNames}`
            : `${this.treeContainerClassName}`;
        return (
            <aside className={containerClassNames}>
            {this.state.treeNodes ? <TreeView treeNodes={this.state.treeNodes} /> : null}
            </aside>
        );
    }

    private syncNodes(): void {
        if (this.tree) {
            this.setState({
                treeNodes: this.tree.nodes()
            });
        }
    }
}

export default AstTree;
