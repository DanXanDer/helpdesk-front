import { Box, Button, Grid, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { LinkGrid } from "../components";

export const ConfirmarDatosPage = () => {

  const navigate = useNavigate();

  const handleGoToPreguntaSeguridadPage = () => {
    navigate('/pregunta-seguridad')
  }

  return (
    <ModuloSeguridadLayout
      pageTitle="Reestablecer clave"
      titleDesc="Confirmación de datos"
    >
      <Box component="form" noValidate sx={{ mt: 1, width: "80%" }}>
        <TextField
          margin="normal"
          fullWidth
          id="nombreUsuario"
          label="Nombre de usuario"
          name="nombreUsuario"
          autoComplete="nombreUsuario"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="nombres"
          name="nombres"
          label="Nombres"
          autoComplete="nombres"
        />
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGoToPreguntaSeguridadPage}
        >
          Siguiente
        </Button>
        <LinkGrid path="/autenticacion" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
