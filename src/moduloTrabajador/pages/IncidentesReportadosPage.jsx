import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { useNavigate } from "react-router-dom";
import { axiosGetRequest } from "../../helpers";
import { getApiUrl } from "../helpers";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { TableColumnsIncidentes } from "../components";
import { CustomNoRowsOverlay } from "../../ui/components";

export const IncidentesReportadosPage = () => {
  const [reportesIncidentes, setReportesIncidentes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axiosGetRequest(
        `${getApiUrl()}/reportes-incidentes`
      );
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
      <Box sx={{ height: 700 }}>
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
