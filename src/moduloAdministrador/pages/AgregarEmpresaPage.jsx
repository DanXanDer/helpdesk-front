import { Controller, useForm } from "react-hook-form";
import { HelpDeskLayout } from "../../ui/layout";
import { TitleWithIcon } from "../../ui/components";
import { AddBusiness } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { SedesArray } from "../components";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  sedes: [
    {
      direccion: "",
      areas: [
        {
          nombre: "",
        }
      ]
    }
  ]
}

export const AgregarEmpresaPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
  });
  const { handleActiveRoute } = useUiStore();
  const { user: { authorities } } = useModuloSeguridadStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const isConfirmed = await showConfirmationMessage(
      "Registrar empresa",
      "¿Está seguro de registrar la empresa?",
      "warning"
    );
    if (!isConfirmed) return;
    try {
      await api.post("/modulo-administrador/agregar-empresa", data);
      showAlertMessage("success", "Exito", "Empresa agregada exitosamente");
      navigate("/gestionar-usuarios");
      handleActiveRoute(authorities[0].idPrivilege);
    } catch (error) {
      const { mensaje: errorMsg } = error.response.data.error;
      showAlertMessage("error", "Error", errorMsg);
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
          <Grid item xs={12}>
            <Typography component="h3" variant="span">
              Sedes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SedesArray {...{ control, errors }} />
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<AddBusiness />}
          >
            Registrar empresa
          </Button>
        </Grid>
      </Box>
    </HelpDeskLayout>
  );
};
