import { Update } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  axiosGetRequest,
  axiosPostRequest,
  showAlertMessage,
} from "../../helpers";
import { getApiUrl } from "../helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FormDatos = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosGetRequest(`${getApiUrl()}/datos-cliente`);
        const { anydesk, teamviewer, correo } = data;
        setValue("anydesk", anydesk);
        setValue("teamviewer", teamviewer);
        setValue("correo", correo);
      } catch (error) {
        const { mensaje } = error.response.data.error;
        showAlertMessage("error", "Error", mensaje);
      }
    })();
  }, [setValue]);

  const onSubmit = async (formData) => {
    try {
      await axiosPostRequest(
        `${getApiUrl()}/actualizar-datos-cliente`,
        formData
      );
      showAlertMessage("success", "Éxito", "Datos actualizados correctamente");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
    navigate("/");
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: "100%" }}
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
        <Update
          sx={{
            mr: 1,
          }}
        />
        <Typography component="h3" variant="span" mb={2}>
          Actualizar informacion
        </Typography>
        <Grid container justifyContent="space-between">
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
                  value: /^[0-9]{9}$/,
                  message:
                    "El número de AnyDesk debe contener 9 caracteres numéricos",
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
                  value: /^[0-9]{9}$/,
                  message:
                    "El número de TeamViewer debe contener 9 caracteres numéricos",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Controller
            defaultValue={getValues("correo") || ""}
            name="correo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ingresa el correo"
                margin="normal"
                fullWidth
                error={!!errors.correo}
                helperText={errors?.correo?.message}
              />
            )}
            rules={{
              required: "El correo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "El correo no es válido",
              },
            }}
          />
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
                marginBottom: 4,
              }}
              startIcon={<Update />}
            >
              Aceptar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
