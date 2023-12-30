import { Box, Paper, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const HelpDeskLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          component={Paper}
          sx={{
            position: "relative",
            minHeight: "100%",
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            padding: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
