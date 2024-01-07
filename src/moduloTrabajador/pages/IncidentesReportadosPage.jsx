import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { TableColumnsIncidentes } from "../components";
import { CustomNoRowsOverlay } from "../../ui/components";
import api from "../../services/instance";

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
    })();
  }, []);

  return (
    <HelpDeskLayout>
      <Box sx={{ height: 780 }}>
        <DataGrid
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TableColumnsIncidentes()}
          rows={reportesIncidentes}
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
