import { Inbox, Mail } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { CustomIcon } from "./CustomIcon";

export const SideBarListItem = ({ idPrivilegio, label, icon, path }) => {

  return (
    <ListItem key={idPrivilegio} disablePadding>
      <ListItemButton onClick={(path) => } >
        <ListItemIcon>
          <CustomIcon icon={icon} />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
