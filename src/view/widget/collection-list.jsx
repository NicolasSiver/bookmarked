import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "./collection-item";
import {getCollections} from "../../model/selectors";

const getCollectionItems = items => {
    return items.map(collection => {
        return (
            <div className="collection-item" key={collection.id}>
                <CollectionItem name={collection.name} />
            </div>
        );
    });
};

export const CollectionList = props => {
    const collections = useSelector(getCollections);

    return (
        <div className="collection-list">
            {getCollectionItems(collections)}
        </div>
    );
};
