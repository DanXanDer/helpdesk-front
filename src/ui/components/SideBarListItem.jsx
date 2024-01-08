import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CustomIcon } from "./CustomIcon";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../hooks";

export const SideBarListItem = ({ idPrivilegio, label, icon, path }) => {
  const navigate = useNavigate();
  const { handleDrawerToggle, handleActiveRoute, activeRoute } = useUiStore();

  const handleEnrutamientoPrivilegio = () => {
    handleActiveRoute(idPrivilegio);
    navigate(`/${path}`);
    handleDrawerToggle();
  };

  return (
    <ListItem key={idPrivilegio} disablePadding>
      <ListItemButton
        onClick={() => handleEnrutamientoPrivilegio()}
        selected={activeRoute === idPrivilegio}
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
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
