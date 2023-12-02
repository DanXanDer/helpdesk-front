import { Button, Grid, TextField, Typography } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Report } from "@mui/icons-material";
import { FilePond, registerPlugin } from "react-filepond";
import { useRef } from "react";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { showAlertMessage } from "../../helpers";
import { getApiUrl } from "../helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const ReportarIncidentePage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const filePondRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombreIncidente", data.nombreIncidente);
      formData.append("descripcion", data.descripcion);
      data.imagenes.forEach((imagen) => formData.append("imagenes", imagen));
      await axios.post(`${getApiUrl()}/reportar-incidente`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
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
      <Typography component="h5" variant="span">
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
              message: "El resumen del incidente debe tener máximo 100 caracteres",
            }
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
              label="Detalle el incidente a reportar"
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
              message: "La descripción del incidente debe tener máximo 500 caracteres",
            }
          }}
        />
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
              maxFiles={3}
              credits={false}
              labelIdle='Arrastre y suelte sus archivos o <span class="filepond--label-action"> Examinar </span>'
            />
          )}
        />

        <Grid container>
          <Grid item></Grid>
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
              }}
              startIcon={<Report />}
            >
              Reportar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
