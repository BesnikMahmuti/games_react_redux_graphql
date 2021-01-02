import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { togglePanel } from "../actions/toggleLeftSidePanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.leftSidePanel);
  console.log({ isToggled });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              console.log("clickeed menu", isToggled);
              dispatch(togglePanel(!isToggled));
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Games
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
