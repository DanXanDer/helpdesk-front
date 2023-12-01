import { createTheme } from "@mui/material/styles";
import { esES as coreEsES} from "@mui/material/locale";
import { DataGrid, esES } from '@mui/x-data-grid';

export const muiTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#151616",
      },
      secondary: {
        main: "#9c27b0",
      },
      background: {
        default: "#f9f2f2",
      },
    },
  },
  coreEsES,
  esES
);
