import * as React from "react";

interface Props {
    readonly containerClassNames?: string;
    readonly body: string;
    readonly onChange: (evt: React.FormEvent<HTMLTextAreaElement>) => void;
}

const SourcePart: React.SFC<Props> = props => {
    const containerClassNames = props.containerClassNames
        ? `${props.containerClassNames}`
        : "";
    return (
        <textarea
            className={containerClassNames}
            value={props.body}
            onChange={props.onChange}
        />
    );
};

export default SourcePart;
