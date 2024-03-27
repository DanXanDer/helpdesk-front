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
import { PageTitle } from "../../ui/components";
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
    user: { authorities },
  } = useModuloSeguridadStore();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("password") !== watch("rePassword") && getValues("rePassword") ? true : false;

  const onSubmit = async (formData) => {
    const isConfirmed = await showConfirmationMessage(
      "¿Está seguro?",
      "Se actualizará su clave",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      await api.post("/modulo-client/informacion/actualizar-password", formData);
      showAlertMessage("success", "Éxito", "Clave actualizada correctamente");
      handleActiveRoute(authorities[0].idPrivilege);
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
          <PageTitle icon={<Password />} title="Cambiar password" />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  error={!!errors.password || passwordMatch}
                >
                  Ingresa tu nueva clave
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.password || passwordMatch}
                  label="Ingresa tu nueva clave"
                  {...register("password", {
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
                {errors?.password ? (
                  <FormHelperText error>
                    {errors?.password?.message}
                  </FormHelperText>
                ) : passwordMatch ? (
                  <FormHelperText error>Las claves no coinciden</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel
                  htmlFor="outlined-adornment-rePassword"
                  error={!!errors.rePassword || passwordMatch}
                >
                  Confirma tu nueva clave
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-rePassword"
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
                  error={!!errors.rePassword || passwordMatch}
                  label="Confirma tu nueva clave"
                  {...register("rePassword", {
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
                {errors?.rePassword ? (
                  <FormHelperText error>
                    {errors?.rePassword?.message}
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
