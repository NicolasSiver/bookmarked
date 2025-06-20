import { InputBase } from '@mui/material';
import React from 'react';
import IconSearch from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';

export const SearchBar = (props) => {
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
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                }
            },
        },
    }));

    return (
        <div className="search-bar">
            <StyledBackground>
                <StyledIcon>
                    <IconSearch />
                </StyledIcon>
                <StyledInput
                    placeholder="Search…" />
            </StyledBackground>
        </div>
    );
};
