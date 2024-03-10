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
  showAlertMessage
} from "../../helpers";
import { useModuloSeguridadStore } from "../../hooks";
import api from "../../services/instance";

export const AutenticacionPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const { handleUserLogin } = useModuloSeguridadStore();

  const onSubmit = async (formData) => {
    try {
      const { data: userDetails } = await api.post("/home", formData);
      if (!!userDetails.firstLogin) {
        const { data: secretQuestions } = await api.get("/secret-questions");
        navigate("/completar-datos", {
          state: {
            userDetails,
            secretQuestions,
          }
        })
      } else {
        handleUserLogin(userDetails);
        navigate("/bienvenida");
      }
    } catch ({ response }) {
      const { message } = response.data;
      showAlertMessage("error", "Error", message);
    }
    /* try {
      const { data : userDetails } = await api.post(
        "/home/check-first-login",
        formData
      );
      const { idUsuario, primerLogin } = data;
      if (primerLogin === 1) {
        const { data } = await api.get("/seguridad/preguntas-seguridad");
        const { secretQuestions } = data;
        navigate("/completar-datos", {
          state: { idUsuario, secretQuestions },
        });
      } else {
        const { data } = await api.post("/seguridad/logear-user", idUsuario);
        handleUserLogin(data);
        navigate("/bienvenida");
      }
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    } */
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
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu nombre de user"
              margin="normal"
              fullWidth
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
          )}
          rules={{
            required: "El user es requerido",
          }}
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-clave" error={!!errors.password}>
            Ingresa tu clave
          </InputLabel>
          <OutlinedInput
            defaultValue=""
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!!errors.password}
            label="Ingresa tu clave"
            {...register("password", { required: "La clave es requerida" })}
          />
          {errors?.password && (
            <FormHelperText error>{errors?.password?.message}</FormHelperText>
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
