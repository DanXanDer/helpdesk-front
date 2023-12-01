import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { axiosPostRequest } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../moduloSeguridad/helpers/getApiUrl";

export const NavBar = ({ drawerWidth }) => {
  const { usuario, handleUsuarioLogout } = useModuloSeguridadStore();

  const { handleDrawerToggle } = useUiStore();

  const navigate = useNavigate();

  const onUsuarioLogout = async () => {
    handleUsuarioLogout();
    await axiosPostRequest(`${getApiUrl()}/logout-usuario`, null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Bienvenido! {usuario.nombres}
        </Typography>
        <IconButton
          sx={{
            color: "white",
          }}
          onClick={() => onUsuarioLogout()}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
