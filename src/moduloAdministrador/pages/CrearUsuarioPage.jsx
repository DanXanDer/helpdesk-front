import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { FormCliente } from "../components";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { TitleWithIcon } from "../../ui/components";

const tipoUsuario = [
  {
    id: 2,
    nombreTipoUsuario: "Trabajador",
  },
  {
    id: 3,
    nombreTipoUsuario: "Cliente",
  },
];

export const CrearUsuarioPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    unregister,
    watch,
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [selectTipoUsuario, setSelectTipoUsuario] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  let passwordMatch =
    watch("clave") !== watch("reClave") && getValues("reClave") ? true : false;

  const handleSeleccionTipo = async ({ target }) => {
    const { value } = target;
    setSelectTipoUsuario(value);
    setValue("tipo", value);
    clearErrors("tipo");

    if (value === "Cliente") {
      const { data } = await api.get("/modulo-administrador/empresas");
      unregister("nivel");
      setEmpresas(data.empresas);
    } else {
      unregister("empresa");
      unregister("sede");
      unregister("area");
      unregister("anydesk");
      unregister("teamviewer");
      setEmpresas([]);
    }
  };

  const onSubmit = async (data) => {
    const isConfirmed = await showConfirmationMessage(
      "Crear usuario",
      "¿Está seguro de crear el usuario?",
      "warning"
    );
    if (!isConfirmed) return;
    const privilegiosTrabajador = [5, 6];
    const privilegiosCliente = [1, 3, 4];
    let formData;
    let apiUrl = "/modulo-administrador";
    const { tipo } = data;
    if (tipo === "Trabajador") {
      apiUrl += "/usuarios/crear-trabajador";
      formData = {
        ...data,
        privilegios: privilegiosTrabajador,
      };
    } else {
      apiUrl += "/usuarios/crear-cliente";
      formData = {
        privilegios: privilegiosCliente,
        idArea: data.area,
        ...data,
      };
    }
    try {
      await api.post(apiUrl, formData);
      showAlertMessage(
        "success",
        "Usuario creado",
        "El usuario se creó correctamente"
      );
      navigate("/gestionar-usuarios");
    } catch (error) {
      const { mensaje } = error.response.data.error;
      showAlertMessage("error", "Error", mensaje);
    }
  };

  return (
    <HelpDeskLayout>
      <TitleWithIcon icon={<PersonAdd />} title="Crear usuario" />
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="nombreUsuario"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ingresa nombre de usuario"
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
          </Grid>
          <Grid item xs={12} md={5.8} >
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel
                htmlFor="outlined-adornment-clave"
                error={!!errors.clave}
              >
                Ingresa la clave
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
                label="Ingresa la clave"
                {...register("clave", {
                  required: "La clave es requerida",
                  minLength: {
                    value: 8,
                    message: "La clave debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors?.clave && (
                <FormHelperText error>{errors?.clave?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5.8}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel
                htmlFor="outlined-adornment-reClave"
                error={!!errors.reClave || passwordMatch}
              >
                Confirma la clave
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
                <FormHelperText error>
                  {errors?.reClave?.message}
                </FormHelperText>
              ) : passwordMatch ? (
                <FormHelperText error>Las claves no coinciden</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="nombres"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ingrese el nombre"
                  margin="normal"
                  fullWidth
                  autoComplete="nombres"
                  error={!!errors.nombres}
                  helperText={errors?.nombres?.message}
                />
              )}
              rules={{
                required: "El nombre es requerido",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "El nombre solo puede contener letras",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="apellidos"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ingresa los apellidos"
                  margin="normal"
                  fullWidth
                  autoComplete="apellidos"
                  error={!!errors.apellidos}
                  helperText={errors?.apellidos?.message}
                />
              )}
              rules={{
                required: "Los apellidos son requeridos",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Los apellidos solo pueden contener letras",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="correo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ingresa el correo"
                  margin="normal"
                  fullWidth
                  error={!!errors.correo}
                  helperText={errors?.correo?.message}
                />
              )}
              rules={{
                required: "El correo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                  message: "El correo no es válido",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-tipo-label" error={!!errors.tipo}>
                Tipo de usuario
              </InputLabel>
              <Controller
                name="tipo"
                defaultValue={selectTipoUsuario}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={handleSeleccionTipo}
                    labelId="select-tipo-label"
                    id="select-tipo"
                    value={selectTipoUsuario}
                    label="Tipo de usuario"
                    error={!!errors.tipo}
                  >
                    {tipoUsuario.map(({ id, nombreTipoUsuario }) => (
                      <MenuItem key={id} value={nombreTipoUsuario}>
                        {nombreTipoUsuario}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                rules={{
                  required: "El tipo de usuario es requerido",
                }}
              />
              {errors?.tipo ? (
                <FormHelperText error>{errors?.tipo?.message}</FormHelperText>
              ) : null}
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {selectTipoUsuario === "Cliente" ? (
          <FormCliente
            empresas={empresas}
            errors={errors}
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        ) : null}
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 4,
              }}
              startIcon={<PersonAdd />}
            >
              Crear usuario
            </Button>
          </Grid>
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
