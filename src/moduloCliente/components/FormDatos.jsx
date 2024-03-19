import { Update } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { TitleWithIcon } from "../../ui/components";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const FormDatos = () => {
  const navigate = useNavigate();
  const { handleActiveRoute } = useUiStore();
  const {
    user: { authorities },
  } = useModuloSeguridadStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/modulo-cliente/informacion/datos");
        const { anydesk, teamviewer, email } = data;
        setValue("anydesk", anydesk);
        setValue("teamviewer", teamviewer);
        setValue("email", email);
      } catch (error) {
        const { mensaje } = error.response.data.error;
        showAlertMessage("error", "Error", mensaje);
      }
    })();
  }, [setValue]);

  const onSubmit = async (formData) => {
    const isConfirmed = await showConfirmationMessage(
      "¿Está seguro?",
      "Se actualizarán sus datos",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      await api.post("/modulo-cliente/informacion/actualizar-datos", formData);
      showAlertMessage("success", "Éxito", "Datos actualizados correctamente");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
    handleActiveRoute(authorities[0].idPrivilege);
    navigate("/reportar-incidente");
  };

  return (
    <Box component={Paper} p={2} elevation={5}>
      <Box
        component="form"
        noValidate
        sx={{ width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <TitleWithIcon icon={<Update />} title="Actualizar información" />
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item xs={12} md={5.8}>
              <Controller
                defaultValue={getValues("anydesk") || ""}
                name="anydesk"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de AnyDesk"
                    margin="normal"
                    fullWidth
                    error={!!errors.anydesk}
                    helperText={errors?.anydesk?.message}
                  />
                )}
                rules={{
                  required: "El número de AnyDesk es requerido",
                  pattern: {
                    value: /^[0-9]+$/,
                    message:
                      "El AnyDesk solo debe contener caracteres numéricos",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={5.8}>
              <Controller
                defaultValue={getValues("teamviewer") || ""}
                name="teamviewer"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ingrese el número de TeamViewer"
                    margin="normal"
                    fullWidth
                    error={!!errors.teamviewer}
                    helperText={errors?.teamviewer?.message}
                  />
                )}
                rules={{
                  required: "El número de TeamViewer es requerido",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El TeamViewer solo deebe contener números",
                  },
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                defaultValue={getValues("email") || ""}
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ingresa correo electrónico"
                    margin="normal"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                )}
                rules={{
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "El correo electrónico no es válido",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 2,
                  marginBottom: 2,
                }}
                startIcon={<Update />}
              >
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
