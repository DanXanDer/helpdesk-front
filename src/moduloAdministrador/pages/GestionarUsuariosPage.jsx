import { Box, Button, Grid, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getUsuarios } from "../helpers";
import { TableColumnUsuarios } from "../components";
import { useNavigate } from "react-router-dom";
import { ManageAccounts, PersonAdd } from "@mui/icons-material";
import { CustomNoRowsOverlay, LoadingRowsOverlay } from "../../ui/components";

export const GestionarUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    (async () => {
      const { usuarios } = await getUsuarios();
      setUsuarios(usuarios);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  const handleUpdateUsuarios = (usuarios) => {
    setUsuarios(usuarios);
  };

  return (
    <HelpDeskLayout>
      <Grid
        container
        spacing={1}
        sx={{
          alignItems: "center",
        }}
        mb={2}
      >
        <Grid item>
          <ManageAccounts />
        </Grid>
        <Grid item>
          <Typography component="h3" variant="span">
            Gestionar usuarios
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ height: "80%" }}>
        <DataGrid
          autoPageSize
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TableColumnUsuarios(handleUpdateUsuarios)}
          rows={usuarios}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: loadingRows
              ? LoadingRowsOverlay
              : CustomNoRowsOverlay,
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
