import { Box, Tab, Tabs, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../ui/components";
import { useEffect, useState } from "react";
import { axiosGetRequest, formatFecha } from "../../helpers";
import { getApiUrl } from "../helpers";
import { TablesColumnsMisReportes } from "../components";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MisReportesPage = () => {
  const [misReportesPorEstado, setMisReportesPorEstado] = useState([]);
  const [misReportes, setMisReportes] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axiosGetRequest(`${getApiUrl()}/reportes`);
      const dataReportes = data.map((reporte) => {
        const { fechaCreacion, trabajador, reporteIncidente } = reporte;
        const { fecha } = reporteIncidente;
        return {
          id: reporteIncidente.idReporteIncidente,
          fechaReporte: formatFecha(fecha),
          fechaCreacion: formatFecha(fechaCreacion),
          trabajador,
          ...reporteIncidente,
        };
      });
      setMisReportes(dataReportes);
      setMisReportesPorEstado(dataReportes);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    let dataReportesTable = [];
    if (newValue === 1) {
      dataReportesTable = misReportes.filter(
        (reporte) => reporte.estado === "En espera"
      );
    } else if (newValue === 2) {
      dataReportesTable = misReportes.filter(
        (reporte) => reporte.estado === "En atención"
      );
    } else if (newValue === 3) {
      dataReportesTable = misReportes.filter(
        (reporte) => reporte.estado === "Por confirmar atención"
      );
    } else if (newValue === 4) {
      dataReportesTable = misReportes.filter(
        (reporte) => reporte.estado === "Atendido"
      );
    } else {
      dataReportesTable = misReportes;
    }
    setMisReportesPorEstado(dataReportesTable);
    setValue(newValue);
  };

  return (
    <HelpDeskLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Todos" {...a11yProps(0)} />
            <Tab label="En espera" {...a11yProps(0)} />
            <Tab label="En atención" {...a11yProps(1)} />
            <Tab label="Por confirmar atención" {...a11yProps(2)} />
            <Tab label="Atendidos" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ height: 750 }} mt={3}>
        <DataGrid
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TablesColumnsMisReportes()}
          rows={misReportesPorEstado}
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
