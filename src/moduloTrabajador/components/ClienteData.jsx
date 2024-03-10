import { Grid, TextField } from "@mui/material";
import {
  ModalEnviarMensaje,
  ModalTable,
  SpeedDialComponent,
  TitleWithIcon,
} from "../../ui/components";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useModuloSeguridadStore } from "../../hooks";

export const ClienteData = ({ datosCliente, ticket }) => {
  const [openModalHistorialMensajes, setOpenModalHistorialMensajes] =
    useState(false);
  const [openModalComunicarseCliente, setModalComunicarseCliente] =
    useState(false);

  const [mensajes, setMensajes] = useState([]);

  const { user } = useModuloSeguridadStore();

  const handleClickOpenModalHistorialMensajes = () => {
    setOpenModalHistorialMensajes(true);
  };

  const handleCloseModalHistorialMensajes = () => {
    setOpenModalHistorialMensajes(false);
  };

  const handleClickOpenModalComunicarseCliente = () => {
    setModalComunicarseCliente(true);
  };

  const handleCloseModalComunicarseCliente = () => {
    setModalComunicarseCliente(false);
  };

  const handleUpdateMsgTable = (ticketMensajes) => {
    setMensajes(ticketMensajes);
  };

  return (
    <Grid container gap={2} flexDirection={"column"}>
      <Grid item>
        <TitleWithIcon icon={<Person />} title="Datos del cliente" />
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <Grid container gap={1.5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombres"
                  value={datosCliente.nombres}
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
                  value={datosCliente.apellidos}
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
                  value={datosCliente.correo}
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
                  value={datosCliente.anydesk}
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
                  value={datosCliente.teamviewer}
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
                  value={datosCliente.nombreEmpresa}
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
                  value={datosCliente.nombreSede}
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
                  value={datosCliente.nombreArea}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              {ticket.estado === "En atención" ||
              ticket.estado === "Por confirmar atención" ? (
                <>
                  <SpeedDialComponent
                    handleClickOpenModalHistorialMensajes={
                      handleClickOpenModalHistorialMensajes
                    }
                    handleClickOpenModalComunicarseCliente={
                      handleClickOpenModalComunicarseCliente
                    }
                    idTicket={ticket.idTicket}
                    handleUpdateMsgTable={handleUpdateMsgTable}
                  />
                  <ModalTable
                    mensajes={mensajes}
                    idTicket={ticket.idTicket}
                    open={openModalHistorialMensajes}
                    handleClose={handleCloseModalHistorialMensajes}
                  />
                  <ModalEnviarMensaje
                    open={openModalComunicarseCliente}
                    handleClose={handleCloseModalComunicarseCliente}
                    idTicket={ticket.idTicket}
                    emisor={user.nombres + " " + user.apellidos}
                    receptor={
                      datosCliente.nombres + " " + datosCliente.apellidos
                    }
                    handleUpdateMsgTable={handleUpdateMsgTable}
                  />
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
