import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { green } from "@material-ui/core/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { togglePanel } from "../actions/toggleLeftSidePanel";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

export const LeftSidePanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.leftSidePanel);

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={(e, icon) => {
        console.log({ e, icon });
      }}
      key="AddCircleIcon"
    >
      <List>
        <ListItem button>
          <ListItemIcon style={{ minWidth: "35px" }}>
            <AddCircleIcon style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText primary="Add new game to the list" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Fragment key="left">
        <SwipeableDrawer
          anchor="left"
          open={isToggled}
          onClose={() => dispatch(togglePanel(false))}
        >
          {list("left")}
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};
