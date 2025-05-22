import { Grid2, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";

export const CollectionItem = props => {
    const items = useSelector(getCollectionItemsById(props.collection.id)) || [];

    return (
        <div className="collection-item">
            <Typography variant="h5" component="div">{props.collection.name}</Typography>
            {renderItems(items)}
        </div>
    );
};

const renderItem = item => {
    return (
        <Grid2 key={item.id} size={1}>
            {item.title}
        </Grid2>
    );
};

const renderItems = items => {
    let container = null;

    if(items.length > 0) {
        container = (
            <Grid2 container={true}>
                {items.map(item => renderItem(item))}
            </Grid2>
        );
    }else{
        container = (
            <div className="collection-item__alert">
                When you add your first bookmark, it will show up here.
            </div>
        );
    }

    return container;
}
