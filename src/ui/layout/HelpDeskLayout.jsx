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
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          component={Paper}
          sx={{
            minHeight: "875px",
            maxHeight: "100%",
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
