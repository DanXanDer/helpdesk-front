import { Box, Button, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { axiosPostRequest, showAlertMessage } from "../../helpers";

const apiUrl = "http://localhost:8080/api/seguridad";

//TODO: Proteccion de ruta
export const PreguntaSeguridadPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const navigate = useNavigate();

  const { state } = useLocation();

  const { idUsuario, preguntaSeguridad } = state;

  const onSubmit = async (formData) => {
    const formDataWithIdUsuario = {
      ...formData,
      idUsuario,
    };
    try {
      await axiosPostRequest(
        `${apiUrl}/validar-rpta-secreta`,
        formDataWithIdUsuario
      );
      navigate("/reestablecer-clave", {
        state: { idUsuario },
      });
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
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
          value={preguntaSeguridad}
          inputProps={
            { readOnly: true } // readOnly is a boolean attribute of input tag
          }
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
