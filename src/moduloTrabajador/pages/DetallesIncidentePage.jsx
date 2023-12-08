import { Button, Grid, Paper, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosPostRequest, formatFecha, showAlertMessage } from "../../helpers";
import axios from "axios";
import { getApiUrl } from "../helpers";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";
import { ConfirmationNumber } from "@mui/icons-material";

export const DetallesIncidentePage = () => {
  const [imagenes, setImagenes] = useState(null);
  const { state } = useLocation();

  const { rutasImagenes, reporteIncidente } = state;

  const { nombreIncidente, descripcion, fecha, nivel, idReporteIncidente } =
    reporteIncidente;

  const fechaFormateada = formatFecha(fecha);

  const handleCrearTicket = async () => {
    try {
      await axiosPostRequest(`${getApiUrl()}/crear-ticket`, {
        idReporteIncidente,
        estado: "En atención",
      });
      showAlertMessage("success", "Exito", "Ticket creado correctamente");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const promesasImagenes = rutasImagenes.map(async ({ nombreImagen }) => {
          const response = await axios.post(
            `${getApiUrl()}/reporte-incidente-imagen`,
            {
              idReporteIncidente,
              rutaImagen: nombreImagen,
            },
            {
              responseType: "arraybuffer",
            }
          );
          const blob = new Blob([response.data]);
          return URL.createObjectURL(blob);
        });

        const imagenesObtenidas = await Promise.all(promesasImagenes);
        const imagenesParaGallery = imagenesObtenidas.map((url, index) => ({
          original: url,
          thumbnail: url,
        }));
        setImagenes(imagenesParaGallery);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
