import { useLocation, useNavigate } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import {
  formatFecha,
  getImagenes,
  showAlertMessage
} from "../../helpers";
import { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { Person, Report } from "@mui/icons-material";
import { ModalTable, ModalTextField } from "../../ui/components";
import { useModuloSeguridadStore } from "../../hooks";
import api from "../../services/instance";

export const DetallesTicketPage = () => {
  const navigate = useNavigate();

  const [imagenes, setImagenes] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [modalMarcarAtendido, setModalMarcarAtendido] = useState(false);
  const [modalComunicarseCliente, setModalComunicarseCliente] = useState(false);
  const { state } = useLocation();
  const { usuario } = useModuloSeguridadStore();

  const { ticket, datosCliente, rutasImagenes } = state;

  const {
    idTicket,
    nombreIncidente,
    fecha,
    nivel,
    estado,
    descripcion,
    idReporteIncidente,
  } = ticket;

  const {
    nombres,
    apellidos,
    nombreArea,
    nombreSede,
    nombreEmpresa,
    anydesk,
    teamviewer,
    correo,
  } = datosCliente;

  const fechaFormateada = formatFecha(fecha);

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
    (async () => {
      const { data } = await api.get(
        `modulo-trabajador/tickets/${idTicket}/mensajes`
      );
      const mensajesForTable = data.map((mensaje) => ({
        id: mensaje.idMensaje,
        fechaMensaje: formatFecha(mensaje.fecha),
        ...mensaje,
      }));
      setMensajes(mensajesForTable);
    })();
  }, []);

  const handleClickOpenModalCliente = () => {
    setModalComunicarseCliente(true);
  };

  const handleCloseModalCliente = () => {
    setModalComunicarseCliente(false);
  };

  const handleClickOpenModalMarcarAtendido = () => {
    setModalMarcarAtendido(true);
  };

  const handleCloseModalMarcarAtendido = () => {
    setModalMarcarAtendido(false);
  };

  const onSubmitMensaje = async (dataForm) => {
    const { mensaje } = dataForm;
    await api.post(`/modulo-trabajador/tickets/mensaje`, {
      idTicket,
      emisor: usuario.nombres,
      receptor: nombres,
      mensaje,
    });
    showAlertMessage("success", "Éxito", "Mensaje enviado correctamente");
    handleCloseModalCliente();
    const { data } = await api.get(
      `modulo-trabajador/tickets/${idTicket}/mensajes`
    );
    const mensajesForTable = data.map((mensaje) => ({
      id: mensaje.idMensaje,
      fechaMensaje: formatFecha(mensaje.fecha),
      ...mensaje,
    }));
    setMensajes(mensajesForTable);
  };

  const onSubmitCambioEstado = async (data) => {
    const { mensaje } = data;
    await api.post(`/modulo-trabajador/tickets/cambiar-estado-ticket`, {
      idTicket,
      emisor: usuario.nombres,
      receptor: nombres,
      mensaje,
    });
    showAlertMessage("success", "Éxito", "El ticket se marcó como atendido");
    handleCloseModalMarcarAtendido();
    navigate("/");
  };

  return (
    <HelpDeskLayout>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12} md={7.9} component={Paper} elevation={3}>
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
          <Grid container p={1}>
            <Grid item xs={12}>
              {imagenes ? (
                <ReactImageGallery
                  showPlayButton={false}
                  showBullets={true}
                  items={imagenes}
                  renderItem={(item) => (
                    <div className="image-gallery-image">
                      <img
                        src={item.original}
                        alt={item.originalAlt}
                        style={{ width: "100%", height: "500px" }}
                      />
                    </div>
                  )}
                />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.9} p={2} component={Paper} elevation={3}>
          <Grid container gap={2} flexDirection="column" height="100%">
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Person />
                </Grid>
                <Grid item>
                  <Typography component="h3" variant="span">
                    Datos del cliente
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Grid container gap={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nombres"
                        value={nombres}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Apellidos"
                        value={apellidos}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Correo"
                        value={correo}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Anydesk"
                        value={anydesk}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Teamviewer"
                        value={teamviewer}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Empresa"
                        value={nombreEmpresa}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Sede"
                        value={nombreSede}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Area"
                        value={nombreArea}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <ModalTable mensajes={mensajes} />
                </Grid>
                <Grid item>
                  <ModalTextField
                    modalOpen={modalComunicarseCliente}
                    handleClickOpen={handleClickOpenModalCliente}
                    handleClose={handleCloseModalCliente}
                    icon="mail"
                    buttonLabel="Contactar"
                    dialogTitleLabel="Contactarse con el cliente"
                    textFieldLabel="Mensaje"
                    onSubmitFunction={onSubmitMensaje}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={1}>
          <ModalTextField
            modalOpen={modalMarcarAtendido}
            handleClickOpen={handleClickOpenModalMarcarAtendido}
            handleClose={handleCloseModalMarcarAtendido}
            icon="confirmation_number"
            buttonLabel="Marcar ticket como atendido"
            dialogTitleLabel="Describa los detalles de la atención realizada"
            textFieldLabel="Mensaje"
            onSubmitFunction={onSubmitCambioEstado}
          />
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
