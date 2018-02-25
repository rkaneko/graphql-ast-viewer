import * as React from "react";

interface Props {
    readonly containerClassNames?: string;
}

const Header: React.SFC<Props> = props => {
    const containerClassNames = props.containerClassNames
        ? `sw-Header ${props.containerClassNames}`
        : "sw-Header";
    return (
        <header className={containerClassNames}>
          <h1>GraphQL AST viewer</h1>
        </header>
    );
};

export default Header;
