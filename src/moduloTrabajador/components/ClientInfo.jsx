import { useEffect, useState } from "react"
import api from "../../services/instance";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, TextField } from "@mui/material";
import { Person } from "@mui/icons-material";
import { PageTitle } from "../../ui/components";

export const ClientInfo = ({ idClient }) => {

  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: client } = await api.get(`/clients/${idClient}`);
        setClient(client);
      } catch (error) {
        navigate("/error");
      }
    })();
  }, [])

  return (
    <Grid p={2} gap={2} height="100%" container component={Paper} >
      <Grid item xs={12}>
        <PageTitle icon={<Person />} title="Datos del cliente" />
      </Grid>
      {
        client && (
          <Grid item xs={12} height="100%" >
            <Grid container gap={1} height="95%" justifyContent="space-between">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Usuario"
                  value={client.user.username}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={client.user.name}
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
                  value={client.user.lastname}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  value={client.user.email}
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
                  value={client.company}
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
                  value={client.branch}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Área"
                  value={client.area}
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
                  value={client.anydesk}
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
                  value={client.teamviewer}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Grid>

  )

}