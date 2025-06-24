import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const CollectionSpaceSelector = ({ changeCollectionSpaces, collection, spaces }) => {
    const selectedValues = React.useMemo(() => {
        return spaces.filter(space => space.collections.includes(collection.id));
    }, [spaces, collection.id]);

    return (
        <Autocomplete
            id="collection-space-selector"
            limitTags={2}
            multiple={true}
            disablePortal
            options={spaces}
            getOptionKey={option => option.id}
            getOptionLabel={option => option.name}
            filterSelectedOptions={true}
            value={selectedValues}
            onChange={(event, newValue) => {
                changeCollectionSpaces(collection.id, newValue.map(space => space.id));
            }}
            renderInput={params => (
                <TextField {...params} label="Spaces" />
            )}
            sx={{ width: 400, m: 1 }} />
    );
};
