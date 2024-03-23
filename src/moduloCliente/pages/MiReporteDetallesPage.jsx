import { useParams } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout";
import { Button, Grid, Paper } from "@mui/material";
import { formatFecha, getTicketMensajes } from "../../helpers";
import { useEffect, useState } from "react";
import {
  DataGridTable,
  ModalCambiarEstadoTicket,
  ModalEnviarMensaje,
  ReportTicketDescription,
  TitleWithIcon,
} from "../../ui/components";
import { useModuloSeguridadStore } from "../../hooks";
import api from "../../services/instance";
import { TableColumnsHistorialMensajes } from "../../moduloTrabajador/components/TableColumnsHistorialMensajes";
import { Archive, Mail } from "@mui/icons-material";
import { ModalConfirmarAtencion } from "../components";

const tabsLabels = [
  "Todos",
  "En atención",
  "Por confirmar atención",
  "Atendido",
  "No conforme",
];

export const MiReporteDetallesPage = () => {
  const [dataReporteToShow, setDataReporteToShow] = useState({});
  const [mensajes, setMensajes] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [openModalContactarTrabajador, setOpenModalContactarTrabajador] =
    useState(false);
  const { idReporteIncidente } = useParams();
  const { user } = useModuloSeguridadStore();

  useEffect(() => {
    (async () => {
      try {
        const { data: dataReporteIncidente } = await api.get(
          `/modulo-client/reportes/${idReporteIncidente}`
        );
        const { idTicket, reporteIncidente, datosTrabajador } =
          dataReporteIncidente;

        const dataReporteToShow = {
          idTicket,
          fechaFormateada: formatFecha(reporteIncidente.fecha),
          ...reporteIncidente,
          datosTrabajador,
        };
        const ticketMensajes = await getTicketMensajes(idTicket);
        setMensajes(ticketMensajes);
        setDataReporteToShow(dataReporteToShow);
        setTimeout(() => {
          setLoadingRows(false);
        }, 300);
      } catch (error) {
        //TODO: Manejar errores
      }
    })();
  }, []);

  const handleUpdateMsgTable = (ticketMensajes) => {
    setMensajes(ticketMensajes);
  };

  const handleClickOpenModalContactarTrabajador = () => {
    setOpenModalContactarTrabajador(true);
  };

  const handleCloseModalContactarTrabajador = () => {
    setOpenModalContactarTrabajador(false);
  };

  return (
    <HelpDeskLayout>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12}>
          <ReportTicketDescription data={dataReporteToShow} />
        </Grid>
        <Grid item xs={12} component={Paper} p={2}>
          <TitleWithIcon icon={<Archive />} title="Historial de mensajes" />

          <Grid item xs={12}>
            <DataGridTable
              height="60vh"
              columnsTable={TableColumnsHistorialMensajes}
              paramValue={dataReporteToShow.idTicket}
              rows={mensajes}
              loadingRows={loadingRows}
            />
          </Grid>
        </Grid>
        {(dataReporteToShow.enabled === "En atención" ||
          dataReporteToShow.enabled === "Por confirmar atención") && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpenModalContactarTrabajador}
              startIcon={<Mail />}
            >
              Contactar trabajador
            </Button>
            <ModalEnviarMensaje
              open={openModalContactarTrabajador}
              handleClose={handleCloseModalContactarTrabajador}
              idTicket={dataReporteToShow.idTicket}
              emisor={user.name + " " + user.lastname}
              receptor={dataReporteToShow.datosTrabajador}
              handleUpdateMsgTable={handleUpdateMsgTable}
            />
          </Grid>
        )}
        {dataReporteToShow.enabled === "Por confirmar atención" && (
          <ModalCambiarEstadoTicket
            dialogTitle="Confirmar atención"
            dialogContentText="¿Qué le pareció la atención recibida?"
            buttonLabel="Confirmar atención"
            ticket={dataReporteToShow}
            role="client"
            alertDescription="Se ha enviado su conformidad"
          />
        )}
      </Grid>
    </HelpDeskLayout>
  );
};
