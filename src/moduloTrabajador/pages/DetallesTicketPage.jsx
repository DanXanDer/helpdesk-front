import { useParams } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout";
import { Grid, Paper } from "@mui/material";
import { formatFecha, getImages } from "../../helpers";
import { useEffect, useState } from "react";
import {
  GalleryImages,
  ModalCambiarEstadoTicket,
  TicketDetails,
} from "../../ui/components";
import api from "../../services/instance";
import { ClienteData } from "../components/ClienteData";

const datosClienteInit = {
  name: "",
  lastname: "",
  email: "",
  anydesk: "",
  teamviewer: "",
  name: "",
  name: "",
  name: "",
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
      const galleryImages = await getImages(
        rutasImagenes,
        baseUrlGetImagenes
      );
      const detallesTicket = {
        fechaFormateada: formatFecha(ticket.fecha),
        ...ticket,
      };
      setDetallesTicket(detallesTicket);
      setDatosCliente(datosCliente);
      setImagenes(galleryImages);
    })();
  }, [idTicket]);

  return (
    <HelpDeskLayout>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12} md={6.9} component={Paper} elevation={3}>
          <TicketDetails data={detallesTicket} />
          <Grid item xs={12}>
            <GalleryImages imagenes={imagenes} height="60vh" width="100%" />
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
            role="trabajador"
            alertDescription="Se esperará la confirmación del client"
          />
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
