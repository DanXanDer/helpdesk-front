import { Grid, TextField } from "@mui/material";
import {
  ModalEnviarMensaje,
  ModalTable,
  SpeedDialComponent,
  PageTitle,
} from "../../ui/components";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useSecurityModelStore } from "../../hooks";

export const ClienteData = ({ datosCliente, ticket }) => {
  const [openModalHistorialMensajes, setOpenModalHistorialMensajes] =
    useState(false);
  const [openModalComunicarseCliente, setModalComunicarseCliente] =
    useState(false);

  const [mensajes, setMensajes] = useState([]);

  const { user } = useSecurityModelStore();

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
        <PageTitle icon={<Person />} title="Datos del client" />
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <Grid container gap={1.5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombres"
                  value={datosCliente.name}
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
                  value={datosCliente.lastname}
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
                  value={datosCliente.email}
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
                  value={datosCliente.name}
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
                  value={datosCliente.name}
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
                  value={datosCliente.name}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              {ticket.enabled === "En atención" ||
              ticket.enabled === "Por confirmar atención" ? (
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
                    emisor={user.name + " " + user.lastname}
                    receptor={
                      datosCliente.name + " " + datosCliente.lastname
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
