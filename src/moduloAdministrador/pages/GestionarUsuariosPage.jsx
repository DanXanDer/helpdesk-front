import { Box } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getUsuarios } from "../helpers";
import { CustomNoRowsOverlay, TableColumns } from "../components";

export const GestionarUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    (async () => {
      const { usuarios } = await getUsuarios();
      setUsuarios(usuarios);
    })();
  }, []);

  const handleUpdateUsuarios = (usuarios) => {
    setUsuarios(usuarios);
  };

  return (
    <HelpDeskLayout>
      <Box sx={{ height: "100%", width: "100%", backgroundColor: "white" }}>
        <Box sx={{ height: 800, width: 1 }}>
          <DataGrid
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={TableColumns(handleUpdateUsuarios)}
            rows={usuarios}
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
              noResultsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </Box>
    </HelpDeskLayout>
  );
};
