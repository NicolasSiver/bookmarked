import React from "react";
import { useSelector } from "react-redux";

import { DialogCollectionDeleteConfirmation } from "../display/dialog-collection-delete-confirmation";
import { DialogItemEdit } from "../display/dialog-item-edit";
import { DialogCollectionNew } from "../display/dialog-collection-new";
import * as DialogTypes from "../../model/dialog-types";
import { getDialogTarget, getDialogType } from "../../model/selectors";

export const DialogContainer = props => {
    const dialogType = useSelector(getDialogType);
    const dialogTarget = useSelector(getDialogTarget) || '';

    return (
        <div className="dialog-container">
            {createDialogByType(dialogType, dialogTarget, props)}
        </div>
    );
};

const createDialogByType = (dialogType, dialogTarget, props) => {
    switch (dialogType) {
        case DialogTypes.COLLECTION_NEW:
            return <DialogCollectionNew
                dialogContext={dialogTarget}
                {...props} />;

        case DialogTypes.COLLECTION_ITEM_EDIT:
            return <DialogItemEdit
                dialogContext={dialogTarget}
                {...props} />;

        case DialogTypes.COLLECTION_DELETE_CONFIRMATION:
            return <DialogCollectionDeleteConfirmation
                dialogContext={dialogTarget}
                {...props} />;
        default:
            return null;
    }
};
