import { Button, Grid, TextField, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Report } from "@mui/icons-material";
import { FilePond, registerPlugin } from "react-filepond";
import { useRef } from "react";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

export const ReportarIncidentePage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const filePondRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const isConfirmed = await showConfirmationMessage(
      "Reportar incidente",
      "¿Está seguro de reportar el incidente?",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      const formData = new FormData();
      formData.append("nombreIncidente", data.nombreIncidente);
      formData.append("descripcion", data.descripcion);
      data.imagenes.forEach((imagen) => formData.append("imagenes", imagen));
      await api.post("/modulo-cliente/reportar-incidente", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showAlertMessage("success", "Exito", "Incidente reportado correctamente");
      navigate("/bienvenida");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  return (
    <HelpDeskLayout>
      <Typography component="h3" variant="span">
        Reportar incidente
      </Typography>
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
          name="nombreIncidente"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Resume tu incidente"
              margin="normal"
              fullWidth
              autoFocus
              error={!!errors.nombreIncidente}
              helperText={errors?.nombreIncidente?.message}
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
          name="descripcion"
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
              error={!!errors.descripcion}
              helperText={errors?.descripcion?.message}
            />
          )}
          rules={{
            required: "Debe ingresar una descripción del incidente",
            maxLength: {
              value: 500,
              message:
                "La descripción del incidente debe tener máximo 500 caracteres",
            },
          }}
        />
        <Grid>
          <Controller
            name="imagenes"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FilePond
                ref={filePondRef}
                files={field.value}
                onupdatefiles={(fileItems) => {
                  field.onChange(fileItems.map((fileItem) => fileItem.file));
                }}
                allowMultiple={true}
                allowReorder={true}
                allowDrop={false}
                allowImagePreview={false}
                maxFiles={3}
                credits={false}
                labelIdle='<span class="filepond--label-action"> Seleccione las imagenes a adjuntar</span> (3 imágenes como máximo)'
                acceptedFileTypes={["image/*"]}
              />
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
