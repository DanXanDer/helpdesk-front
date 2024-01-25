import { Controller, useForm } from "react-hook-form";
import { HelpDeskLayout } from "../../ui/layout";
import { TitleWithIcon } from "../../ui/components";
import { Add, AddBusiness, Delete } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AddAreaModal } from "../components";
import api from "../../services/instance"
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const AgregarEmpresaPage = () => {

  const [cantidadSedes, setCantidadSedes] = useState(1);
  const [cantidadAreasSede, setCantidadAreasSede] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    control,
    setValue,
    clearErrors,
    unregister,
    watch,
    getValues,
  } = useForm();
  const { handleActiveRoute } = useUiStore();
  const { usuario: { privilegios } } = useModuloSeguridadStore();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
    /* const isConfirmed = await showConfirmationMessage(
      "Registrar empresa",
      "¿Está seguro de registrar la empresa?",
      "warning"
    );
    if (!isConfirmed) return;

    const dataToSend = {
      nombreEmpresa: data.nombreEmpresa,
      sedes: [],
    }
    for (let i = 0; i < cantidadSedes; i++) {
      const cantidadAreas = cantidadAreasSede[`sede${i + 1}`];
      const areas = [];
      for (let j = 0; j < cantidadAreas; j++) {
        const area = {
          nombreArea: data[`sede${i + 1}-area${j + 1}`],
        }
        areas.push(area);
      }
      dataToSend.sedes.push({
        nombreSede: data[`sede${i + 1}`],
        areas,
      })
    }
    try {
      await api.post("/modulo-administrador/agregar-empresa", dataToSend);
      showAlertMessage("success", "Exito", "Empresa agregada exitosamente");
      navigate("/gestionar-usuarios");
      handleActiveRoute(privilegios[0].idPrivilegio);
    } catch (error) {
      showAlertMessage("error", "Error", "No se pudo registrar la empresa, intente nuevamente");
    }
 */
  };


  const handleAddSubstractSede = (operation, index) => {
    if (operation === "add") {
      setCantidadSedes((prevState) => prevState + 1);
    } else {
      if (cantidadSedes === 1) return;
      let nuevaCantidadAreasSede = { ...cantidadAreasSede };
      if (index === cantidadSedes - 1) {
        unregister(`sede${index + 1}`);
        const cantidadAreas = nuevaCantidadAreasSede[`sede${index + 1}`];
        for (let i = 0; i < cantidadAreas; i++) {
          unregister(`sede${index + 1}-area${i + 1}`);
        }
        delete nuevaCantidadAreasSede[`sede${index + 1}`];
      } else {
        for (let i = index; i < cantidadSedes; i++) {
          setValue(`sede${i + 1}`, getValues(`sede${i + 2}`));
          clearErrors(`sede${i + 1}`);
          const cantidadAreasActual = nuevaCantidadAreasSede[`sede${i + 1}`];
          for (let j = 0; j < cantidadAreasActual; j++) {
            unregister(`sede${i + 1}-area${j + 1}`);
          }
          const cantidadAreasNext = nuevaCantidadAreasSede[`sede${i + 2}`];
          for (let j = 0; j < cantidadAreasNext; j++) {
            register(`sede${i + 1}-area${j + 1}`, {
              required: "El nombre del área es requerido",
            });
            setValue(`sede${i + 1}-area${j + 1}`, getValues(`sede${i + 2}-area${j + 1}`));
            clearErrors(`sede${i + 1}-area${j + 1}`);
          }
          nuevaCantidadAreasSede = {
            ...nuevaCantidadAreasSede,
            [`sede${i + 1}`]: cantidadAreasNext,
          }
        }
        unregister(`sede${cantidadSedes}`);
        const cantidadAreasSedeEliminar = nuevaCantidadAreasSede[`sede${cantidadSedes}`];
        for (let i = 0; i < cantidadAreasSedeEliminar; i++) {
          unregister(`sede${cantidadSedes}-area${i + 1}`);
        }
        delete nuevaCantidadAreasSede[`sede${cantidadSedes}`];
        setCantidadAreasSede(nuevaCantidadAreasSede);
      }
      setCantidadSedes((prevState) => prevState - 1);
    }
  };

  return (
    <HelpDeskLayout>
      <TitleWithIcon icon={<AddBusiness />} title="Agregar empresa" />
      <Box
        component="form"
        noValidate
        sx={{ width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="nombreEmpresa"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ingrese el nombre de la empresa"
                  margin="normal"
                  fullWidth
                  autoComplete="nombreEmpresa"
                  autoFocus
                  error={!!errors.nombreEmpresa}
                  helperText={errors?.nombreEmpresa?.message}
                />
              )}
              rules={{
                required: "El nombre de la empresa es requerido",
              }}
            />
          </Grid>
          {
            cantidadSedes > 0 && (
              <Grid item xs={12}>
                <Typography component="h3" variant="span">
                  Sedes
                </Typography>
              </Grid>
            )
          }
          {Array.from({ length: cantidadSedes }).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} xl={9} >
                  <Controller
                    defaultValue=""
                    name={`sede${index + 1}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`Ingrese ubicación de la sede ${index + 1}`}
                        margin="normal"
                        fullWidth
                        autoComplete={`sede${index + 1}`}
                        autoFocus
                        error={!!errors[`sede${index + 1}`]}
                        helperText={errors[`sede${index + 1}`]?.message}
                      />
                    )}
                    rules={{
                      required: `La ubicación de la sede ${index + 1
                        } es requerido`,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Grid container gap={2}>
                    <Grid item>
                      <AddAreaModal
                        cantidadAreasSede={cantidadAreasSede}
                        setCantidadAreasSede={setCantidadAreasSede}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        unregister={unregister}
                        getValues={getValues}
                        control={control}
                        errors={errors}
                        numeroSede={`sede${index + 1}`} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAddSubstractSede("substract", index)}
                      >
                        <Delete />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} mt={3}>
            <Button
              variant="contained"
              color="info"
              onClick={() => handleAddSubstractSede("add")}
            >
              <Add />
            </Button>
          </Grid>
          {cantidadSedes > 0 && (
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<AddBusiness />}
              >
                Agregar
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
