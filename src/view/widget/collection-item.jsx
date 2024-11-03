import React from "react";
import { useSelector } from "react-redux";

export const CollectionItem = props => {
    const items = useSelector(() => undefined);

    return (
        <div className="collection-item">
            I am Collection Item: {props.name}
        </div>
    );
};
