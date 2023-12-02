import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LinkGrid } from "../components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  axiosGetRequest,
  axiosPostRequest,
  showAlertMessage,
} from "../../helpers";
import { useModuloSeguridadStore } from "../../hooks";
import { getApiUrl } from "../helpers";

export const AutenticacionPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const { handleUsuarioLogin } = useModuloSeguridadStore();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axiosPostRequest(
        `${getApiUrl()}/check-primer-login`,
        formData
      );

      const { idUsuario, primerLogin } = data;

      if (primerLogin === 1) {
        const { data } = await axiosGetRequest(`${getApiUrl()}/preguntas-seguridad`);
        const { preguntasSeguridad } = data;
        navigate("/completar-datos", {
          state: { idUsuario, preguntasSeguridad },
        });
      } else {
        const { data } = await axiosPostRequest(
          `${getApiUrl()}/logear-usuario`,
          idUsuario
        );
        handleUsuarioLogin(data);
        navigate("/bienvenida")
      }
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Autenticación"
      titleDesc="Ingreso de credenciales"
    >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <Controller
          defaultValue=""
          name="nombreUsuario"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu nombre de usuario"
              margin="normal"
              fullWidth
              autoComplete="nombreUsuario"
              autoFocus
              error={!!errors.nombreUsuario}
              helperText={errors?.nombreUsuario?.message}
            />
          )}
          rules={{
            required: "El usuario es requerido",
          }}
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-clave" error={!!errors.clave}>
            Ingresa tu clave
          </InputLabel>
          <OutlinedInput
            defaultValue=""
            id="outlined-adornment-clave"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!!errors.clave}
            label="Ingresa tu clave"
            {...register("clave", { required: "La clave es requerida" })}
          />
          {errors?.clave && (
            <FormHelperText error>{errors?.clave?.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Ingresar
        </Button>
        <LinkGrid path="/confirmar-datos" text="¿Olvidaste tu clave?" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
