import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ModuloSeguridadLayout } from "../layout";
import { LinkGrid } from "../components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export const ReestablecerClavePage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const [showRePassword, setReShowPassword] = useState(false);

  const handleClickShowRePassword = () => {
    setReShowPassword(!showRePassword);
  }

  return (
    <ModuloSeguridadLayout
      pageTitle="Reestablecer clave"
      titleDesc="Ingresa tu nueva clave"
    >
      <Box component="form" noValidate sx={{ mt: 1, width: "80%" }}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-clave">
            Ingresa tu clave
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-clave"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Ingresa tu clave"
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-clave">
            Ingresa tu clave nuevamente
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-clave"
            type={showRePassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowRePassword}
                  edge="end"
                >
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Ingresa tu clave"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Ingresar
        </Button>
        <LinkGrid path="/autenticacion" text="Ir al inicio" />
      </Box>
    </ModuloSeguridadLayout>
  );
};
