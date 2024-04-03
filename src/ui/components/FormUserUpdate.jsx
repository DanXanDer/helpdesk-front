import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSecurityModelStore, useUiStore } from "../../hooks";
import { PageTitle } from ".";
import { Edit, Save } from "@mui/icons-material";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";

export const FormUserUpdate = ({ user }) => {

  const { username, name, lastname, email, id } = user;

  const navigate = useNavigate();
  const { handleActiveRoute } = useUiStore();
  const {
    user: { authorities },
  } = useSecurityModelStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const isConfirmed = await showConfirmationMessage(
        "¿Está seguro de continuar?",
        "Se actualizará su información",
        "warning"
      );
      if (!isConfirmed) return;
      await api.patch(`/users/${id}/update`, data);
      showAlertMessage("success", "Éxito", "Información actualizada correctamente");
      navigate("/bienvenida")
      handleActiveRoute(null);
    } catch ({ response }) {
      const { message } = response.data;
      showAlertMessage("error", "Error", message);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PageTitle icon={<Edit />} title="Datos generales" />
      <Grid container gap={1}>
        <Grid item xs={12}>
          <Controller
            defaultValue={username}
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre de usuario"
                margin="normal"
                fullWidth
                autoComplete="username"
                autoFocus
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
            )}
            rules={{
              required: "El usuario es requerido",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            defaultValue={name}
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                margin="normal"
                fullWidth
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
            rules={{
              required: "El nombre es requerido",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            defaultValue={lastname}
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apellidos"
                margin="normal"
                fullWidth
                autoComplete="lastname"
                autoFocus
                error={!!errors.lastname}
                helperText={errors?.lastname?.message}
              />
            )}
            rules={{
              required: "Los apellidos son requeridos",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            defaultValue={email}
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                margin="normal"
                fullWidth
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}
            rules={{
              required: "El correo electrónico es requerido",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            startIcon={<Save />}
          >Guardar</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
