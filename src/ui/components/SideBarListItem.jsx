import { Inbox, Mail } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { CustomIcon } from "./CustomIcon";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../hooks";

export const SideBarListItem = ({ idPrivilegio, label, icon, path }) => {
  const navigate = useNavigate();
  const { handleDrawerToggle } = useUiStore();

  const handleEnrutamientoPrivilegio = () => {
    navigate(`/${path}`);
    handleDrawerToggle();
  };

  return (
    <ListItem key={idPrivilegio} disablePadding>
      <ListItemButton onClick={() => handleEnrutamientoPrivilegio()}>
        <ListItemIcon>
          <CustomIcon icon={icon} />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
