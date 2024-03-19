import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { TableColumnsIncidentes } from "../components";
import { DataGridTable, TitleWithIcon } from "../../ui/components";
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
        return { ...reporte, id: idReporteIncidente, fecha, datosCliente: reporte.nombres + " " + reporte.lastname };
      });
      setReportesIncidentes(reportesIncidentesWithId);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  return (
    <HelpDeskLayout>
      <TitleWithIcon icon={<Report />} title="Incidentes reportados" />
      <DataGridTable
        height="80%"
        columnsTable={TableColumnsIncidentes}
        rows={reportesIncidentes}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
