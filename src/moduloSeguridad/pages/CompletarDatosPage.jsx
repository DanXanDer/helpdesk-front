import React, { useEffect, useState } from "react";
import { ModuloSeguridadLayout } from "../layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { SelectAll, Visibility, VisibilityOff } from "@mui/icons-material";
import { axiosPostRequest, showAlertMessage } from "../../helpers";
import axios from "axios";
import { getApiUrl } from "../helpers";

export const CompletarDatosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);
  const [preguntasSeguridad, setPreguntasSeguridad] = useState([]);

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    const { preguntasSeguridad } = state;
    setPreguntasSeguridad(preguntasSeguridad);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("clave") !== watch("reClave") && getValues("reClave") ? true : false;

  const onSubmit = async (formData) => {

    const formDataWithIdUsuario = {
      ...formData,
      idUsuario: state.idUsuario
    };

    try {
      const {data}  = await axiosPostRequest(`${getApiUrl()}/completar-datos`, formDataWithIdUsuario)
      //TODO: Redireccion a la pagina de bienvenida
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  return (
    <ModuloSeguridadLayout
      pageTitle="Autenticación"
      titleDesc="Completa tus datos"
    >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <FormControl fullWidth margin="normal">
          <InputLabel
            id="select-pregunta-seguridad-label"
            error={!!errors.preguntaSeguridad}
          >
            Pregunta de seguridad
          </InputLabel>
          <Controller
            name="preguntaSeguridad"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="select-pregunta-seguridad-label"
                id="select-pregunta-seguridad"
                label="Pregunta de seguridad"
                error={!!errors.preguntaSeguridad}
                autoFocus
              >
                {preguntasSeguridad.map(
                  ({ idPreguntaSeguridad, nombrePreguntaSeguridad }) => (
                    <MenuItem
                      key={idPreguntaSeguridad}
                      value={idPreguntaSeguridad}
                    >
                      {nombrePreguntaSeguridad}
                    </MenuItem>
                  )
                )}
              </Select>
            )}
            rules={{
              required: "La pregunta de seguridad es requerida",
            }}
          />
          {errors?.preguntaSeguridad ? (
            <FormHelperText error>
              {errors?.preguntaSeguridad?.message}
            </FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>

        <Controller
          defaultValue=""
          name="rptaSecreta"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu respuesta secreta"
              margin="normal"
              fullWidth
              autoComplete="rptaSecreta"
              error={!!errors.rptaSecreta}
              helperText={errors?.rptaSecreta?.message}
            />
          )}
          rules={{
            required: "La respuesta secreta es requerida",
          }}
        />

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
      </Box>
    </ModuloSeguridadLayout>
  );
};
