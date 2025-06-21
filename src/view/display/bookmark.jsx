import { Button, Tooltip } from "@mui/material";
import React from "react";

export const Bookmark = props => {
    return (
        <Tooltip title={props.item.desc} placement="top">
            <Button
                fullWidth
                onClick={props.clickHandler}
                startIcon={<img src={props.item.favUrl} style={{ width: 16, height: 16 }} />}
                sx={{
                    textAlign: 'left',
                    textTransform: 'none'
                }}
                variant="outlined">
                <span style={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%'
                }}>{props.item.title}</span>
            </Button>
        </Tooltip>
    );
};
