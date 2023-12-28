import { useLocation } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { formatFecha, showAlertMessage } from "../../helpers";
import { Report } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableColumnsHistorialMensajes } from "../../moduloTrabajador/components";
import { CustomNoRowsOverlay, ModalTextField } from "../../ui/components";
import { useModuloSeguridadStore } from "../../hooks";
import { ModalConfirmarAtencion } from "../components";
import api from "../../services/instance";

export const MiReporteDetallesPage = () => {
  const [mensajes, setMensajes] = useState([]);
  const [modalComunicarseTrabajador, setModalComunicarseTrabajador] =
    useState(false);
  const { state } = useLocation();

  const { ticket, reporteIncidente, nombreTrabajador } = state;

  const { usuario } = useModuloSeguridadStore();

  const { idTicket } = ticket;

  const {
    nombreIncidente,
    descripcion,
    nivel,
    fecha,
    estado,
    idReporteIncidente,
  } = reporteIncidente;

  const fechaFormateada = formatFecha(fecha);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(
        `/modulo-cliente/reportes/${idTicket}/mensajes`
      );
      const mensajesForTable = data.map((mensaje) => ({
        id: mensaje.idMensaje,
        fechaMensaje: formatFecha(mensaje.fecha),
        ...mensaje,
      }));
      setMensajes(mensajesForTable);
    })();
  }, []);

  const handleClickOpenModalTrabajador = () => {
    setModalComunicarseTrabajador(true);
  };

  const handleCloseModalTrabajador = () => {
    setModalComunicarseTrabajador(false);
  };

  const onSubmitMensaje = async (data) => {
    const { mensaje } = data;
    await api.post("/modulo-cliente/reportes/mensaje", {
      idTicket,
      emisor: usuario.nombres,
      receptor: nombreTrabajador,
      mensaje,
    });

    showAlertMessage("success", "Éxito", "Mensaje enviado correctamente");
    const { data: mensajes } = await api.get(`/modulo-cliente/reportes/${idTicket}/mensajes`);
    const mensajesForTable = mensajes.map((mensaje) => ({
      id: mensaje.idMensaje,
      fecha: formatFecha(mensaje.fecha),
      ...mensaje,
    }));
    setMensajes(mensajesForTable);
    handleCloseModalTrabajador();
  };

  return (
    <HelpDeskLayout>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12} component={Paper} elevation={3}>
          <Grid container p={2} flexDirection="column" component={Paper}>
            <Grid container spacing={1}>
              <Grid item>
                <Report />
              </Grid>
              <Grid item>
                <Typography component="h3" variant="span">
                  Incidente: {nombreIncidente}
                </Typography>
              </Grid>
            </Grid>
            <Grid item mt={2}>
              <Typography component="p" variant="span">
                Descripción del incidente: {descripcion}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between" mt={2}>
              <Typography component="h5" variant="span">
                Nivel de incidente: {nivel}
              </Typography>
              <Typography component="h5" variant="span">
                Fecha de reporte: {fechaFormateada}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ height: "550px" }}
          mt={3}
          component={Paper}
          elevation={3}
          p={2}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Grid item>
              <Typography component="h4" variant="span">
                Historial de mensajes
              </Typography>
            </Grid>
            <Grid item>
              <ModalTextField
                modalOpen={modalComunicarseTrabajador}
                handleClickOpen={handleClickOpenModalTrabajador}
                handleClose={handleCloseModalTrabajador}
                icon="mail"
                buttonLabel="Contactar"
                dialogTitleLabel="Contactarse con el trabajador asignado"
                textFieldLabel="Mensaje"
                onSubmitFunction={onSubmitMensaje}
              />
            </Grid>
          </Grid>
          <Box sx={{ height: "90%" }}>
            <DataGrid
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              columns={TableColumnsHistorialMensajes()}
              rows={mensajes}
              slots={{
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
        </Grid>
        {estado === "Por confirmar atención" && (
          <ModalConfirmarAtencion
            idTicket={idTicket}
            idReporteIncidente={idReporteIncidente}
          />
        )}
      </Grid>
    </HelpDeskLayout>
  );
};
