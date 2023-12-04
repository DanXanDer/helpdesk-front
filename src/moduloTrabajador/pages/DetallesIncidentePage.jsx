import { Box, Grid, Paper, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosPostRequest, formatFecha } from "../../helpers";
import axios from "axios";
import { getApiUrl } from "../helpers";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

export const DetallesIncidentePage = () => {
  const [imagenes, setImagenes] = useState(null);
  const { state } = useLocation();

  const { rutasImagenes, reporteIncidente } = state;

  const { nombreIncidente, descripcion, fecha, nivel, idReporteIncidente } =
    reporteIncidente;

  const fechaFormateada = formatFecha(fecha);

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
          thumbnail: url, // Puedes usar la misma URL como miniatura o proporcionar una miniatura diferente
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
        alignItems="center"
        component={Paper}
        gap={2}
        mb={3}
        p={2}
      >
        <Grid item>
          <Typography component="h3" variant="span">
            Incidente: {nombreIncidente}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="span" variant="span">
            Fecha de reporte: {fechaFormateada}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="p" variant="span" ml={2}>
        Descripción del incidente: {descripcion}
      </Typography>
      <Grid width="900px" m="auto" component={Paper} sx={{
        mt: 5,
        p: 2,
        backgroundColor: "#f5f5f5"
      }} >
        <Typography component="h3" variant="span" mb={2} textAlign="center" >Imagenes adjuntadas</Typography>
        {imagenes ? (
          <ReactImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            items={imagenes}
            full
          />
        ) : null}
      </Grid>
    </HelpDeskLayout>
  );
};
