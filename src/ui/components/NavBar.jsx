import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { axiosPostRequest } from "../../helpers";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8080/api/seguridad";

export const NavBar = ({ drawerWidth }) => {
  const { usuario, handleUsuarioLogout } = useModuloSeguridadStore();

  const { handleDrawerToggle } = useUiStore();

  const navigate = useNavigate();

  const onUsuarioLogout = async () => {
    handleUsuarioLogout();
    await axiosPostRequest(`${apiUrl}/logout-usuario`, null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "primary.light",
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
        <Button
          onClick={onUsuarioLogout}
          color="error"
          variant="contained"
          startIcon={<Logout />}
        >
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};
