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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { axiosPostRequest, showAlertMessage } from "../../helpers";

const apiUrl = "http://localhost:8080/api/seguridad";

//TODO: Proteccion de ruta
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

  const { idUsuario } = state;

  useEffect(() => {
    console.log(state);
  },[])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("clave") !== watch("reClave") && getValues("reClave") ? true : false;

  const onSubmit = async (formData) => {
    console.log(formData, idUsuario);
    const formDataWithIdUsuario = {
      ...formData,
      idUsuario,
    };
    try {
      await axiosPostRequest(
        `${apiUrl}/reestablecer-clave`,
        formDataWithIdUsuario
      );
      showAlertMessage("success", "Éxito", "Clave reestablecida correctamente");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
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
            <FormHelperText error>{errors?.clave?.message}</FormHelperText>
          ) : passwordMatch ? (
            <FormHelperText error>Las claves no coinciden</FormHelperText>
          ) : null}
        </FormControl>

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
                <IconButton onClick={handleClickShowRePassword} edge="end">
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
            <FormHelperText error>{errors?.reClave?.message}</FormHelperText>
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
        <LinkGrid path="/autenticacion" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
