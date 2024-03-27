import { Box, Button, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const ValidateUserSecretQuestionPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  if (!state) {
    return window.location.replace("/mensaje-sistema");
  }

  const { id, secretQuestion } = state;

  const onSubmit = async (data) => {
    try {
      await api.post(`/users/${id}/validate-secret-answer`, data);
      navigate("/reestablecer-clave", {
        state: { id }
      })
    } catch ({ response }) {
      const { message } = response.data;
      showAlertMessage("error", "Error", message);
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
          id="secretQuestion"
          name="secretQuestion"
          label="Pregunta de seguridad"
          value={secretQuestion}
          inputProps={
            { readOnly: true } // readOnly is a boolean attribute of input tag
          }
        />

        <Controller
          defaultValue=""
          name="secretAnswer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu respuesta secreta"
              margin="normal"
              fullWidth
              autoComplete="secretAnswer"
              autoFocus
              error={!!errors.secretAnswer}
              helperText={errors?.secretAnswer?.message}
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
        <LinkGrid path="/login" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
