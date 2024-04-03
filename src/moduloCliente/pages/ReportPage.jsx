import { Button, Grid, TextField, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Report } from "@mui/icons-material";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { FileUploader, PageTitle } from "../../ui/components";
import { useSecurityModelStore, useUiStore } from "../../hooks";

export const ReportPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const filePondRef = useRef(null);
  const navigate = useNavigate();
  const { handleActiveRoute } = useUiStore();
  const {
    user: { id, authorities },
  } = useSecurityModelStore();

  const onSubmit = async (data) => {
    const isConfirmed = await showConfirmationMessage(
      "Reportar incidente",
      "¿Está seguro de reportar el incidente?",
      "warning"
    );
    if (!isConfirmed) return;
    const { summary, description, images } = data;
    const formData = new FormData();
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("idClient", id);
    images.forEach((image) => formData.append("images", image));
    try {
      await api.post("/tickets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      });
      showAlertMessage("success", "Exito", "Incidente reportado correctamente");
      navigate("/bienvenida");
    } catch (error) {
      showALertMessage("error", "Error", "Hubo un error inesperado. Intente nuevamente");
    }
  };

  return (
    <HelpDeskLayout>
      <PageTitle icon={<Report />} title="Reportar incidente" />
      <Typography component="span" variant="span">
        Detalle el incidente que presenta. De ser necesario, adjunte imágenes
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          defaultValue=""
          name="summary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Resume tu incidente"
              margin="normal"
              fullWidth
              autoFocus
              error={!!errors.summary}
              helperText={errors?.summary?.message}
            />
          )}
          rules={{
            required: "El resumen del incidente es requerido",
            maxLength: {
              value: 100,
              message:
                "El resumen del incidente debe tener máximo 100 caracteres",
            },
          }}
        />
        <Controller
          defaultValue=""
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                mb: 4,
              }}
              label="Detalle el incidente"
              margin="normal"
              multiline
              rows={8}
              fullWidth
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
          )}
          rules={{
            required: "Debe ingresar una descripción del incidente",
            maxLength: {
              value: 500,
              message:
                "La descripción del incidente debe tener máximo 500 caracteres",
            },
            minLength: {
              value: 5,
              message:
                "La descripción del incidente debe tener mínimo 10 caracteres",
            }
          }}
        />
        <Grid>
          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FileUploader filePondRef={filePondRef} field={field} />
            )}
          />
        </Grid>
        <Grid
          container
          justifyContent="center"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            mb: 2,
            width: "100%",
          }}
        >
          <Grid item>
            <Button type="submit" variant="contained" startIcon={<Report />}>
              Reportar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
