import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import api from "../../services/instance";

export const NavBar = ({ drawerWidth }) => {
  const { usuario, handleUsuarioLogout } = useModuloSeguridadStore();

  const { handleDrawerToggle } = useUiStore();

  const onUsuarioLogout = async () => {
    handleUsuarioLogout();
    await api.post("/seguridad/logout-usuario");
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
