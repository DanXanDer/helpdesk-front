import { Box, Button, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { useNavigate } from "react-router-dom";
import { LinkGrid } from "../components";
import { Controller, useForm } from "react-hook-form";
import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const ConfirmarDatosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post(
        "/seguridad/validar-datos-user",
        formData
      );
      const { idUsuario, preguntaSeguridad } = data;
      navigate("/pregunta-seguridad", {
        state: { idUsuario, preguntaSeguridad },
      });
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Reestablecer password"
      titleDesc="Confirmación de datos"
    >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          defaultValue=""
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu user"
              margin="normal"
              fullWidth
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
          )}
          rules={{
            required: "El user es requerido",
          }}
        />
        <Controller
          defaultValue=""
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu name"
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
        <Controller
          defaultValue=""
          name="lastname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tus lastname"
              margin="normal"
              fullWidth
              autoComplete="lastname"
              autoFocus
              error={!!errors.lastname}
              helperText={errors?.lastname?.message}
            />
          )}
          rules={{
            required: "Apellidos son requeridos",
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Siguiente
        </Button>
        <LinkGrid path="/autenticacion" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
