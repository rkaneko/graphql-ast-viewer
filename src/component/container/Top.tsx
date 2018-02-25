import {
    NodeConfig
} from "inspire-tree";
import * as React from "react";
import {
    connect
} from "react-redux";

import {
    State
} from "../../app/store/rootReducer";

import changeSourceInput from "../../app/top/usecase/changeSourceInput";

import AstPart from "../top/AstPart";
import Header from "../sitewide/header/Header";
import SourcePart from "../top/SourcePart";

function onChangeSource(evt: React.FormEvent<HTMLTextAreaElement>): void {
    const input = evt.currentTarget.value;
    changeSourceInput(input);
}

interface TopState {
    readonly sourceBody: string;
    readonly ast?: NodeConfig;
}

type Props = TopState;

const Top: React.SFC<Props> = props => {
    return (
        <div className="Top_Container">
            <Header containerClassNames="Top_Header"/>
            <SourcePart
                containerClassNames="Top_SourcePart"
                body={props.sourceBody}
                onChange={onChangeSource}
            />
            <AstPart
                containerClassNames="Top_AstPart"
                rootNode={props.ast}
            />
        </div>
    );
};

function mapStateToProps(state: State): TopState {
    const {
        sourceBody,
        ast
    } = state.top;
    return {
        sourceBody,
        ast
    };
}

export default connect(mapStateToProps)(Top);
