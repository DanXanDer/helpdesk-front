import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const ReestablecerClavePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  if (!state) {
    return window.location.replace("/mensaje-sistema");
  }

  const { id } = state;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("password") !== watch("rePassword") && getValues("rePassword") ? true : false;

  const onSubmit = async (data) => {
    try {
      await api.patch(`/users/${id}/update`, data);
      showAlertMessage("success", "Éxito", "Clave reestablecida correctamente");
      navigate("/login");
    } catch ({ response }) {
      const { message } = response.data;
      showAlertMessage("error", "Error", message);
    }
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Reestablecer clave"
      titleDesc="Ingresa tu nueva clave"
    >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <FormHelperText error>{errors?.password?.message}</FormHelperText>
          ) : passwordMatch ? (
            <FormHelperText error>Las claves no coinciden</FormHelperText>
          ) : null}
        </FormControl>
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
                <IconButton onClick={handleClickShowRePassword} edge="end">
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
            <FormHelperText error>{errors?.rePassword?.message}</FormHelperText>
          ) : passwordMatch ? (
            <FormHelperText error>Las claves no coinciden</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Ingresar
        </Button>
        <LinkGrid path="/login" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
