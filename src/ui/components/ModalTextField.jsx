import { Mail } from "@mui/icons-material";
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomIcon } from "./CustomIcon";

export const ModalTextField = ({
  modalOpen,
  handleClickOpen,
  handleClose,
  icon,
  buttonLabel,
  dialogTitleLabel,
  textFieldLabel,
  onSubmitFunction,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await onSubmitFunction(data);
    reset();
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginTop: 4,
        }}
        startIcon={<CustomIcon icon={icon} />}
        onClick={handleClickOpen}
      >
        {buttonLabel}
      </Button>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <CustomIcon icon={icon} />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                {dialogTitleLabel}
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
                  label={textFieldLabel}
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
