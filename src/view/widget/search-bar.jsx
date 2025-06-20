import { InputBase } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import IconSearch from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';

import { getSearchQuery } from '../../model/selectors';

export const SearchBar = props => {
    const query = useSelector(getSearchQuery);

    const queryCallback = event => {
        props.changeSearchQuery(event.target.value);
    };

    const StyledBackground = styled('div')(({ theme }) => ({
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        position: 'relative',
        width: '100%',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    }));

    const StyledIcon = styled('div')(({ theme }) => ({
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        pointerEvents: 'none',
        position: 'absolute'
    }));

    const StyledInput = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            width: '20ch'
        },
    }));

    return (
        <div className="search-bar">
            <StyledBackground>
                <StyledIcon>
                    <IconSearch />
                </StyledIcon>
                <StyledInput
                    onChange={queryCallback}
                    placeholder="Search…"
                    value={query} />
            </StyledBackground>
        </div>
    );
};
