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
import { ConfirmationNumber } from "@mui/icons-material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { showAlertMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";

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

export const ModalConfirmarAtencion = ({ idTicket, idReporteIncidente }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const { enabled, mensaje } = data;
    let formData;
    if (enabled === "Conforme") {
      formData = {
        idTicket,
        idReporteIncidente,
        estadoTicket: "Conforme",
        estadoReporteIncidente: "Atendido",
        mensaje,
      };
    } else {
      formData = {
        idTicket,
        idReporteIncidente,
        estadoTicket: "No conforme",
        estadoReporteIncidente: "En atención",
        mensaje,
      };
    }
    await api.post("/modulo-cliente/cambiar-enabled-ticket", formData);
    showAlertMessage("success", "Éxito", "Se ha enviado su conformidad");
    reset();
    handleClose();
    navigate("/");
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginTop: 4,
        }}
        startIcon={<ConfirmationNumber />}
        onClick={handleClickOpen}
      >
        Confirmar atención
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <ConfirmationNumber />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                Confirmar atención
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>

        <Box
          component="form"
          mt={-3}
          noValidate
          sx={{ width: "500px" }}
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <DialogContentText>Escriba su mensaje</DialogContentText>
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-conformidad-label" error={!!errors.enabled}>
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
                <FormHelperText error>{errors?.enabled?.message}</FormHelperText>
              ) : null}
              <FormHelperText></FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
