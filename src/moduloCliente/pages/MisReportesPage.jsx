import { HelpDeskLayout } from "../../ui/layout";
import { DataGridTable } from "../../ui/components";
import { useEffect, useState } from "react";
import { formatFecha } from "../../helpers";
import { TablesColumnsMisReportes } from "../components";
import api from "../../services/instance";
import { TableTabs } from "../../ui/components/TableTabs";

const tabsLabels = [
  "Todos",
  "En espera",
  "En atención",
  "Por confirmar atención",
  "Atendidos",
];

export const MisReportesPage = () => {
  const [misReportesPorEstado, setMisReportesPorEstado] = useState([]);
  const [misReportes, setMisReportes] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/modulo-cliente/reportes");
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
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setLoadingRows(true);
    const estadosFiltrados = {
      1: "En espera",
      2: "En atención",
      3: "Por confirmar atención",
      4: "Atendido",
    };
    const estadoFiltrado = estadosFiltrados[newValue];
    const dataReportesTable = estadoFiltrado
      ? misReportes.filter((reporte) => reporte.estado === estadoFiltrado)
      : misReportes;
    setMisReportesPorEstado(dataReportesTable);
    setValue(newValue);
    setTimeout(() => {
      setLoadingRows(false);
    }, 300);
  };

  return (
    <HelpDeskLayout>
      <TableTabs
        tabsLabels={tabsLabels}
        value={value}
        handleChange={handleChange}
      />
      <DataGridTable
        height="80%"
        columnsTable={TablesColumnsMisReportes}
        paramValue={() => {}}
        rows={misReportesPorEstado}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
