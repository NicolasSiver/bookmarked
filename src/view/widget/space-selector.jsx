import { FormControl, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import IconEdit from '@mui/icons-material/Edit';
import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../model/constants';
import * as DialogTypes from '../../model/dialog-types';
import { getMode, getSpacesCurrent, getSpacesList } from '../../model/selectors';

export const SpaceSelector = props => {
    const currentSpace = useSelector(getSpacesCurrent) || Constants.DEFAULT_SPACE;
    const mode = useSelector(getMode);
    const spacesList = useSelector(getSpacesList);

    const spaceCallback = event => {
        props.changeSpace(event.target.value);
    };

    const spaceEditCallback = () => {
        props.openDialog(DialogTypes.SPACE_EDIT);
    };

    const renderList = () => {
        return (
            <div className="space-selector">
                <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        id='space-selector'
                        onChange={spaceCallback}
                        value={currentSpace}>
                        <MenuItem value={Constants.DEFAULT_SPACE}>
                            <em>Show all</em>
                        </MenuItem>
                        {spacesList.map(space => (
                            <MenuItem key={space.id} value={space.id}>
                                {space.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {mode === 'edit' && (
                    <Tooltip title="Edit spaces">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="edit-spaces"
                            sx={{ mr: 1 }}
                            onClick={spaceEditCallback}>
                            <IconEdit />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        );
    };

    return (spacesList.length === 0) ? null : renderList();
};
