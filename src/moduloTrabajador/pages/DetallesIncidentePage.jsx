import { Button, Grid } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  formatFecha,
  getImagenes,
  showAlertMessage,
  showConfirmationMessage,
} from "../../helpers";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";
import { ConfirmationNumber } from "@mui/icons-material";
import api from "../../services/instance";
import { ImageGallery, ReportTicketDescription } from "../../ui/components";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const DetallesIncidentePage = () => {
  const [imagenes, setImagenes] = useState([]);
  const [dataReporteToShow, setDataReporteToShow] = useState({});
  const { idReporteIncidente } = useParams();
  const navigate = useNavigate();
  const { handleActiveRoute } = useUiStore();
  const {
    user: { authorities },
  } = useModuloSeguridadStore();

  const handleCrearTicket = async () => {
    const isConfirmed = await showConfirmationMessage(
      "Crear ticket",
      "¿Está seguro de crear un ticket de este reporte?",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      await api.post(`modulo-trabajador/crear-ticket`, {
        idReporteIncidente,
        enabled: "En atención",
      });
      showAlertMessage("success", "Exito", "Ticket creado correctamente");
      handleActiveRoute(authorities[1].idPrivilege);
      navigate("/mis-tickets");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  useEffect(() => {
    const baseUrlGetImagenes =
      import.meta.env.VITE_BACKEND_API_URL +
      `/modulo-sistema/reportes/${idReporteIncidente}/imagenes`;
    (async () => {
      const { data } = await api.get(
        `/modulo-trabajador/reportes-incidentes/${idReporteIncidente}`
      );
      const { rutasImagenes, reporteIncidente } = data;
      const dataReporteToShow = {
        fechaFormateada: formatFecha(reporteIncidente.fecha),
        ...reporteIncidente,
      };
      setDataReporteToShow(dataReporteToShow);
      const imagenesParaGallery = await getImagenes(
        rutasImagenes,
        baseUrlGetImagenes
      );
      setImagenes(imagenesParaGallery);
    })();
  }, [idReporteIncidente]);

  return (
    <HelpDeskLayout>
      <ReportTicketDescription data={dataReporteToShow} />
      <Grid container>
        <Grid item xs={12}>
          {imagenes ? (
            <ImageGallery imagenes={imagenes} height="55vh" width="100%" />
          ) : null}
        </Grid>
        <Grid item xs={12} textAlign="center" mt={5}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<ConfirmationNumber />}
            onClick={handleCrearTicket}
          >
            Crear ticket
          </Button>
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
