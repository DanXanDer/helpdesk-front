import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { TitleWithIcon } from "../../ui/components";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const FormClave = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleActiveRoute } = useUiStore();
  const {
    usuario: { privilegios },
  } = useModuloSeguridadStore();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("clave") !== watch("reClave") && getValues("reClave") ? true : false;

  const onSubmit = async (formData) => {
    const isConfirmed = await showConfirmationMessage(
      "¿Está seguro",
      "Se actualizará su clave",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      await api.post("/modulo-cliente/informacion/actualizar-clave", formData);
      showAlertMessage("success", "Éxito", "Clave actualizada correctamente");
      handleActiveRoute(privilegios[0].idPrivilegio);
      navigate("/reportar-incidente");
    } catch (error) {
      showAlertMessage("error", "Error", "Hubo un error, intente nuevamente");
    }
  };

  return (
    <Box component={Paper} p={2} elevation={5}>
      <Box
        component="form"
        noValidate
        sx={{ width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <TitleWithIcon icon={<Password />} title="Cambiar clave" />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel
                  htmlFor="outlined-adornment-clave"
                  error={!!errors.clave || passwordMatch}
                >
                  Ingresa tu nueva clave
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-clave"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.clave || passwordMatch}
                  label="Ingresa tu nueva clave"
                  {...register("clave", {
                    required: "La nueva clave es requerida",
                    minLength: {
                      value: 8,
                      message: "La clave debe tener al menos 8 caracteres",
                    },
                    maxLength: {
                      value: 16,
                      message: "La clave debe tener máximo 16 caracteres",
                    },
                  })}
                />
                {errors?.clave ? (
                  <FormHelperText error>
                    {errors?.clave?.message}
                  </FormHelperText>
                ) : passwordMatch ? (
                  <FormHelperText error>Las claves no coinciden</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel
                  htmlFor="outlined-adornment-reClave"
                  error={!!errors.reClave || passwordMatch}
                >
                  Confirma tu nueva clave
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-reClave"
                  type={showRePassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowRePassword}
                        edge="end"
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.reClave || passwordMatch}
                  label="Confirma tu nueva clave"
                  {...register("reClave", {
                    required: "La confirmación de la clave es requerida",
                    minLength: {
                      value: 8,
                      message: "La clave debe tener al menos 8 caracteres",
                    },
                    maxLength: {
                      value: 16,
                      message: "La clave debe tener máximo 16 caracteres",
                    },
                  })}
                />
                {errors?.reClave ? (
                  <FormHelperText error>
                    {errors?.reClave?.message}
                  </FormHelperText>
                ) : passwordMatch ? (
                  <FormHelperText error>Las claves no coinciden</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 2.5,
                }}
                startIcon={<Password />}
              >
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
