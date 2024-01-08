import { Button, Grid, Paper, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatFecha, getImagenes, showAlertMessage } from "../../helpers";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";
import { ConfirmationNumber } from "@mui/icons-material";
import api from "../../services/instance";

export const DetallesIncidentePage = () => {
  const [imagenes, setImagenes] = useState(null);
  const { incidenteId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { rutasImagenes, reporteIncidente } = state;

  const { nombreIncidente, descripcion, fecha, nivel, idReporteIncidente } =
    reporteIncidente;

  const fechaFormateada = formatFecha(fecha);

  const handleCrearTicket = async () => {
    try {
      await api.post(`modulo-trabajador/crear-ticket`, {
        idReporteIncidente,
        estado: "En atención",
      });
      showAlertMessage("success", "Exito", "Ticket creado correctamente");
      navigate("/");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL + "/modulo-trabajador";
    (async () => {
      const imagenesParaGallery = await getImagenes(
        rutasImagenes,
        baseUrl,
        idReporteIncidente
      );
      setImagenes(imagenesParaGallery);
    })();
  }, [incidenteId]);

  return (
    <HelpDeskLayout>
      <Grid
        container
        justifyContent="space-between"
        component={Paper}
        gap={2}
        mb={3}
        p={2}
      >
        <Grid item>
          <Typography component="h3" variant="span">
            Incidente: {nombreIncidente}
          </Typography>
          <Typography component="h5" variant="span" mt={2}>
            Fecha de reporte: {fechaFormateada}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h4" variant="span">
            Nivel de incidente: {nivel}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="p" variant="span" ml={2}>
        Descripción del incidente: {descripcion}
      </Typography>
      <Grid
        width="900px"
        m="auto"
        component={Paper}
        sx={{
          mt: 5,
          p: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography component="h3" variant="span" mb={2} textAlign="center">
          Imagenes adjuntadas
        </Typography>
        {imagenes ? (
          <ReactImageGallery
            showPlayButton={false}
            showBullets={true}
            items={imagenes}
            full
          />
        ) : null}
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 4,
            }}
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
