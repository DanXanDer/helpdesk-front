import { Box, Button } from "@mui/material";
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
      <Button
        variant="contained"
        sx={{
          mb: 2
        }}
      >
        Crear usuario
      </Button>
      <Box sx={{ height: 700}}>
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
    </HelpDeskLayout>
  );
};
