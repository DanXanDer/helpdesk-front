import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FileUploader } from "./FileUploader";
import { Mail } from "@mui/icons-material";
import { getTicketMensajes, showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const ModalEnviarMensaje = ({
  open,
  handleClose,
  idTicket,
  emisor,
  receptor,
  handleUpdateMsgTable,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const filePondRef = useRef(null);

  const onSubmit = async (data) => {
    const { mensaje, imagenes } = data;
    try {
      const formData = new FormData();
      formData.append("emisor", emisor);
      formData.append("receptor", receptor);
      formData.append("mensaje", mensaje);
      imagenes.forEach((imagen) => formData.append("imagenes", imagen));
      await api.post(
        `/modulo-sistema/tickets/${idTicket}/mensajes/registrar-mensaje`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showAlertMessage("success", "Éxito", "Mensaje enviado correctamente");
    } catch (error) {
      showAlertMessage("error", "Error", "No se pudo enviar el mensaje");
    }
    handleClose();
    const ticketMensajes = await getTicketMensajes(idTicket);
    handleUpdateMsgTable(ticketMensajes);
    reset();
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <Mail />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                Enviar mensaje
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
            <DialogContentText>Escriba su mensaje: </DialogContentText>
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
                  label="Mensaje"
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
