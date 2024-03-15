import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CustomIcon } from "./CustomIcon";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../hooks";

export const SideBarListItem = ({ idPrivilege, authority, icon, url }) => {
  const navigate = useNavigate();
  const { handleDrawerToggle, handleActiveRoute, activeRoute } = useUiStore();

  const handleEnrutamientoPrivilegio = () => {
    handleActiveRoute(idPrivilege);
    navigate(`/${url}`);
    handleDrawerToggle();
  };

  return (
    <ListItem key={idPrivilege} disablePadding>
      <ListItemButton
        onClick={() => handleEnrutamientoPrivilegio()}
        selected={activeRoute === idPrivilege}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#A3A3A3",
            "&:hover": {
              backgroundColor: "#A3A3A3",
            },
          },
        }}
      >
        <ListItemIcon>
          <CustomIcon icon={icon} />
        </ListItemIcon>
        <ListItemText primary={authority} />
      </ListItemButton>
    </ListItem>
  );
};
