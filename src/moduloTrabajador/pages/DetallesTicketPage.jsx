import { useParams } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout";
import { Grid, Paper } from "@mui/material";
import { formatFecha, getImagenes } from "../../helpers";
import { useEffect, useState } from "react";
import {
  ImageGallery,
  ModalCambiarEstadoTicket,
  ReportTicketDescription,
} from "../../ui/components";
import api from "../../services/instance";
import "./styles.css";
import { ClienteData } from "../components/ClienteData";

const datosClienteInit = {
  nombres: "",
  apellidos: "",
  correo: "",
  anydesk: "",
  teamviewer: "",
  nombreEmpresa: "",
  nombreSede: "",
  nombreArea: "",
};

export const DetallesTicketPage = () => {
  const [detallesTicket, setDetallesTicket] = useState({});
  const [datosCliente, setDatosCliente] = useState(datosClienteInit);
  const [imagenes, setImagenes] = useState([]);
  const { idTicket } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`modulo-trabajador/tickets/${idTicket}`);
      const { ticket, datosCliente, rutasImagenes } = data;
      const baseUrlGetImagenes =
        import.meta.env.VITE_BACKEND_API_URL +
        `/modulo-sistema/reportes/${ticket.idReporteIncidente}/imagenes`;
      const imagenesParaGallery = await getImagenes(
        rutasImagenes,
        baseUrlGetImagenes
      );
      const detallesTicket = {
        fechaFormateada: formatFecha(ticket.fecha),
        ...ticket,
      };
      setDetallesTicket(detallesTicket);
      setDatosCliente(datosCliente);
      setImagenes(imagenesParaGallery);
    })();
  }, [idTicket]);

  return (
    <HelpDeskLayout>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12} md={6.9} component={Paper} elevation={3}>
          <ReportTicketDescription data={detallesTicket} />
          <Grid item xs={12}>
            <ImageGallery imagenes={imagenes} height="60vh" width="100%" />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4.9} p={2} component={Paper} elevation={3}>
          <ClienteData datosCliente={datosCliente} ticket={detallesTicket} />
        </Grid>
        <Grid item>
          <ModalCambiarEstadoTicket
            dialogTitle="Marcar como atendido"
            dialogContentText="Detalle la atención realizada"
            buttonLabel="Marcar como atendido"
            ticket={detallesTicket}
            tipoUsuario="trabajador"
            alertDescription="Se esperará la confirmación del cliente"
          />
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
