import { ConfirmationNumber } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FileUploader } from "./FileUploader";
import { showAlertMessage } from "../../helpers";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import api from "../../services/instance";
import { useNavigate } from "react-router-dom";

const conformidad = [
  {
    id: 1,
    enabled: "Conforme",
  },
  {
    id: 2,
    enabled: "No conforme",
  },
];

export const ModalCambiarEstadoTicket = ({
  dialogTitle,
  dialogContentText,
  buttonLabel,
  ticket,
  role,
  alertDescription,
}) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const filePondRef = useRef(null);
  const { user } = useModuloSeguridadStore();
  const { handleActiveRoute } = useUiStore();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const { mensaje, imagenes, enabled } = data;
      const formData = new FormData();
      let estadoTicket = "Por confirmar atención";
      let estadoReporteIncidente = "Por confirmar atención";
      formData.append("idReporteIncidente", ticket.idReporteIncidente);
      formData.append("emisor", `${user.nombres} ${user.lastname}`);
      formData.append("mensaje", mensaje);
      if (!!enabled) {
        if (enabled === "Conforme") {
          (estadoTicket = "Atendido"), (estadoReporteIncidente = "Atendido");
        } else {
          (estadoTicket = "No conforme"),
            (estadoReporteIncidente = "En espera");
        }
      }
      formData.append("estadoTicket", estadoTicket);
      formData.append("estadoReporteIncidente", estadoReporteIncidente);
      imagenes.forEach((imagen) => formData.append("imagenes", imagen));
      await api.post(
        `/modulo-sistema/tickets/${ticket.idTicket}/cambiar-enabled-ticket`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      reset();
      showAlertMessage("success", "Éxito", alertDescription);
      handleClose();
      handleActiveRoute(user.authorities[0].idPrivilege);
      navigate("/reportar-incidente");
    } catch (error) {
      showAlertMessage("error", "Error", "Hubo un error, intente nuevamente");
    }
  };

  return (
    <Box>
      {(ticket.enabled === "En atención" ||
        (role === "cliente" &&
          ticket.enabled === "Por confirmar atención")) && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<ConfirmationNumber />}
          sx={{
            mt: 4,
          }}
        >
          {buttonLabel}
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <ConfirmationNumber />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                {dialogTitle}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Box
          component="form"
          mt={-3}
          noValidate
          sx={{ width: "600px" }}
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <DialogContentText>{dialogContentText}: </DialogContentText>
            <Controller
              defaultValue=""
              name="mensaje"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={8}
                  label="Escriba aqui"
                  margin="normal"
                  autoFocus
                  error={!!errors.mensaje}
                  helperText={errors?.mensaje?.message}
                />
              )}
              rules={{
                required: "El mensaje no puede estar vacío",
                maxLength: {
                  value: 300,
                  message: "Su mensaje debe tener máximo 300 caracteres",
                },
              }}
            />
            {role === "cliente" && (
              <FormControl fullWidth margin="normal">
                <InputLabel
                  id="select-conformidad-label"
                  error={!!errors.enabled}
                >
                  Seleccione su conformidad
                </InputLabel>
                <Controller
                  name="enabled"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="select-conformidad-label"
                      id="select-conformidad"
                      label="Seleccione su conformidad"
                      error={!!errors.enabled}
                      autoFocus
                    >
                      {conformidad.map(({ id, enabled }) => (
                        <MenuItem key={id} value={enabled}>
                          {enabled}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{
                    required: "El enabled es requerido",
                  }}
                />
                {errors?.enabled ? (
                  <FormHelperText error>
                    {errors?.enabled?.message}
                  </FormHelperText>
                ) : null}
                <FormHelperText></FormHelperText>
              </FormControl>
            )}
            <DialogContentText
              sx={{
                mt: 2,
                mb: 2,
              }}
            >
              Adjunte imágenes (opcional):
            </DialogContentText>
            <Controller
              name="imagenes"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FileUploader filePondRef={filePondRef} field={field} />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button type="submit">Enviar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
