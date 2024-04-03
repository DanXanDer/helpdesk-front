import { createTheme } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { DataGrid, esES } from "@mui/x-data-grid";

export const muiTheme = createTheme(
  {
    palette: {
      type: "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      button: {
        fontWeight: 800,
      },
    },
  },
  coreEsES,
  esES
);
