import { Box, Button, Grid, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { LinkGrid } from "../components";
import { Controller, useForm } from "react-hook-form";

export const ConfirmarDatosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };
  
  const navigate = useNavigate();

  const handleGoToPreguntaSeguridadPage = () => {
    navigate("/pregunta-seguridad");
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Reestablecer clave"
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
          name="nombreUsuario"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu usuario"
              margin="normal"
              fullWidth
              autoComplete="nombreUsuario"
              autoFocus
              error={!!errors.nombreUsuario}
              helperText={errors?.nombreUsuario?.message}
            />
          )}
          rules={{
            required: "El usuario es requerido",
          }}
        />
        <Controller
          defaultValue=""
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu nombre"
              margin="normal"
              fullWidth
              autoComplete="nombre"
              autoFocus
              error={!!errors.nombre}
              helperText={errors?.nombre?.message}
            />
          )}
          rules={{
            required: "El nombre es requerido",
          }}
        />
        <Controller
          defaultValue=""
          name="apellidos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tus apellidos"
              margin="normal"
              fullWidth
              autoComplete="apellidos"
              autoFocus
              error={!!errors.apellidos}
              helperText={errors?.apellidos?.message}
            />
          )}
          rules={{
            required: "Los apellidos son requeridos",
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
