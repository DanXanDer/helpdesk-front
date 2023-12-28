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
  TextField,
  Typography,
} from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { axiosGetRequest, showAlertMessage } from "../../helpers";
import { getApiUrl } from "../helpers";
import { FormCliente, FormTrabajador } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectTipoUsuario, setSelectTipoUsuario] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSeleccionTipo = async ({ target }) => {
    const { value } = target;
    setSelectTipoUsuario(value);
    setValue("tipo", value);
    clearErrors("tipo");

    if (value === "Cliente") {
      const { data } = await axiosGetRequest(`${getApiUrl()}/empresas`);

      // Limpiar los campos de trabajador
      unregister("nivel");
      setEmpresas(data.empresas);
    } else {
      //Eliminando campos de cliente
      unregister("empresa");
      unregister("sede");
      unregister("area");
      unregister("anydesk");
      unregister("teamviewer");

      // Limpiar los campos de empresa, sede y area
      setEmpresas([]);
    }
  };

  const onSubmit = async (data) => {
    const privilegiosTrabajador = [5, 6];
    const privilegiosCliente = [1, 3, 4];
    let formData;
    let apiUrl;
    const { tipo } = data;
    if (tipo === "Trabajador") {
      apiUrl = `http://localhost:8080/api/gestion-sistema/crear-trabajador`;
      formData = {
        ...data,
        privilegios: privilegiosTrabajador,
      };
    } else {
      apiUrl = `http://localhost:8080/api/gestion-sistema/crear-cliente`;
      formData = {
        privilegios: privilegiosCliente,
        idArea: data.area,
        ...data,
      };
    }
    try {
      await axios.post(apiUrl, formData);
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
      <Grid
        container
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item>
          <PersonAdd />
        </Grid>
        <Grid item>
          <Typography component="h3" variant="span">
            Crear usuario
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={5.8}>
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
          <Grid item xs={12} md={5.8}>
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
          <Grid item xs={12} md={5.8}>
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
          <Grid item xs={12} md={5.8}>
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
          <Grid item xs={12} md={5.8}>
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
        ) : selectTipoUsuario === "Trabajador" ? (
          <FormTrabajador
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
              Crear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
