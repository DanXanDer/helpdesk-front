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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showAlertMessage } from "../../helpers";
import { useModuloSeguridadStore } from "../../hooks";
import api from "../../services/instance";

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
  const [secretQuestions, setSecretQuestions] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { secretQuestions: secretQuestionsData, userDetails } = state;

  const { handleUserLogin } = useModuloSeguridadStore();

  useEffect(() => {
    setSecretQuestions(secretQuestionsData);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  };

  let passwordMatch =
    watch("password") !== watch("rePassword") && getValues("rePassword") ? true : false;

  const onSubmit = async (formData) => {
    try {
      formData.firstLogin = false;
      formData.secretQuestion = {
        idSecretQuestion: formData.secretQuestion,
      }
      await api.patch(`/users/${userDetails.id}/update`, formData);
      handleUserLogin(userDetails);
    } catch ({ response }) {
      const { message } = response.data;
      showAlertMessage("error", "Error", message);
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
            error={!!errors.secretQuestion}
          >
            Pregunta de seguridad
          </InputLabel>
          <Controller
            name="secretQuestion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="select-pregunta-seguridad-label"
                id="select-pregunta-seguridad"
                label="Pregunta de seguridad"
                error={!!errors.secretQuestion}
                autoFocus
              >
                {secretQuestions.map(
                  ({ idSecretQuestion, name }) => (
                    <MenuItem
                      key={idSecretQuestion}
                      value={idSecretQuestion}
                    >
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            )}
            rules={{
              required: "La pregunta de seguridad es requerida",
            }}
          />
          {errors?.secretQuestion ? (
            <FormHelperText error>
              {errors?.secretQuestion?.message}
            </FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>

        <Controller
          defaultValue=""
          name="secretAnswer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingresa tu respuesta secreta"
              margin="normal"
              fullWidth
              autoComplete="secretAnswer"
              error={!!errors.secretAnswer}
              helperText={errors?.secretAnswer?.message}
            />
          )}
          rules={{
            required: "La respuesta secreta es requerida",
          }}
        />

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
      </Box>
    </ModuloSeguridadLayout>
  );
};
