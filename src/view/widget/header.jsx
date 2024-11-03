import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu"
import IconSettings from "@mui/icons-material/Settings"

export const Header = () => {
    return (
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <IconMenu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bookmarked ver. 0.0.0
                    </Typography>
                    <Button color="inherit"></Button>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="settings"
                        sx={{ ml: 2 }}>
                        <IconSettings />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};
