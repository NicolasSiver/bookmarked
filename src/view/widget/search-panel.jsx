import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getSearchResults } from "../../model/selectors";

export const SearchPanel = props => {
    const searchResults = useSelector(getSearchResults);

    const createHint = () => {
        return (
            <div className="search-panel__hint">
                <Box sx={{ py: 2 }}>No results found.</Box>
            </div>
        );
    };

    return (
        <div className="search-panel">
            <Paper elevation={2} sx={{ mx: 2, my: 1 }}>
                <Stack spacing={3} sx={{ px: 2, py: 1 }}>
                    <Typography variant="h5" component="div" sx={{ m: 1, fontWeight: 300 }}>
                        Search results {`(${searchResults.length})`}
                    </Typography>
                    {searchResults.length === 0 ? createHint() : null}
                </Stack>
            </Paper>
        </div>
    );
};
