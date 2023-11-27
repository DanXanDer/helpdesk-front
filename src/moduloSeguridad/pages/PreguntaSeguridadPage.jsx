import { Box, Button, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

export const PreguntaSeguridadPage = () => {
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

  const handleGoToReestablecerClavePage = () => {
    navigate("/reestablecer-clave");
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Pregunta de seguridad"
      titleDesc="Ingresa la respuesta a tu pregunta de seguridad"
    >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          margin="normal"
          fullWidth
          id="preguntaSeguridad"
          name="preguntaSeguridad"
          label="Pregunta de seguridad"
          defaultValue={"¿Cuál es el nombre de tu mascota?"}
          InputProps={{
            readOnly: true,
          }}
        />

        <Controller
          defaultValue=""
          name="rptaSecreta"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu respuesta secreta"
              margin="normal"
              fullWidth
              autoComplete="rptaSecreta"
              autoFocus
              error={!!errors.rptaSecreta}
              helperText={errors?.rptaSecreta?.message}
            />
          )}
          rules={{
            required: "La respuesta secreta es requerida",
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
