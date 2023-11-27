import { Box, Button, TextField } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { useNavigate } from "react-router-dom";

export const PreguntaSeguridadPage = () => {

  const navigate = useNavigate();

  const handleGoToReestablecerClavePage = () => {
    navigate('/reestablecer-clave')
  }

  return (
    <ModuloSeguridadLayout
      pageTitle="Pregunta de seguridad"
      titleDesc="Ingresa la respuesta a tu pregunta de seguridad"
    >
      <Box component="form" noValidate sx={{ mt: 1, width: "80%" }}>
      <TextField
          margin="normal"
          fullWidth
          id="preguntaSeguridad"
          name="preguntaSeguridad"
          label="Pregunta de seguridad"
          defaultValue={"¿Cuál es el nombre de tu mascota?"}
          InputProps={{
            readOnly: true,
          }}
        />
        
        <TextField
          margin="normal"
          fullWidth
          id="rptaSecreta"
          name="rptaSecreta"
          label="Respuesta secreta"
          autoComplete="rptaScreta"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGoToReestablecerClavePage}
        >
          Siguiente
        </Button>
        <LinkGrid path="/autenticacion" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
