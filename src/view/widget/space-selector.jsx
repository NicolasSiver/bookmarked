import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../model/constants';
import { getSpacesCurrent, getSpacesList } from '../../model/selectors';

export const SpaceSelector = props => {
    const currentSpace = useSelector(getSpacesCurrent) || Constants.DEFAULT_SPACE;
    const spacesList = useSelector(getSpacesList);

    const spaceCallback = event => {
        props.changeSpace(event.target.value);
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
            </div>
        );
    };

    return (spacesList.length === 0) ? null : renderList();
};
