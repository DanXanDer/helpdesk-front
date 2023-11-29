import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const NavBar = ({ drawerWidth }) => {

  const { usuario } = useModuloSeguridadStore();

  const { handleDrawerToggle } = useUiStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
};
