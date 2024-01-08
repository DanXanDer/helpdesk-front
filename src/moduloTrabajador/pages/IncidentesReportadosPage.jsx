import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { TableColumnsIncidentes } from "../components";
import { CustomNoRowsOverlay, LoadingRowsOverlay } from "../../ui/components";
import api from "../../services/instance";
import { Report } from "@mui/icons-material";

export const IncidentesReportadosPage = () => {
  const [reportesIncidentes, setReportesIncidentes] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/modulo-trabajador/reportes-incidentes");
      const { reportesIncidentes } = data;
      const reportesIncidentesWithId = reportesIncidentes.map((reporte) => {
        const { idReporteIncidente } = reporte;
        const fecha = new Date(reporte.fecha).toLocaleString("es-ES");
        return { ...reporte, id: idReporteIncidente, fecha };
      });
      setReportesIncidentes(reportesIncidentesWithId);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

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
          <Report />
        </Grid>
        <Grid item>
          <Typography component="h3" variant="span">
            Incidentes reportados
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ height: "80%" }} component={Paper}>
        <DataGrid
          autoPageSize
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TableColumnsIncidentes()}
          rows={reportesIncidentes}
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
