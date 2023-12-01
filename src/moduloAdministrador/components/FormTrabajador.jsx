import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

const niveles = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export const FormTrabajador = ({ control, errors, setValue, clearErrors }) => {
  const [nivel, setNivel] = useState("");

  const handleSeleccionNivel = ({ target }) => {
    const { value } = target;
    setNivel(value);
    setValue("nivel", value);
    clearErrors("nivel");
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-nivel-label" error={!!errors.nivel}>
          Selecciona el nivel del trabajador
        </InputLabel>
        <Controller
          name="nivel"
          defaultValue={nivel}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={handleSeleccionNivel}
              labelId="select-nivel-label"
              id="select-nivel"
              value={nivel}
              label="Selecciona el nivel del trabajador"
              error={!!errors.nivel}
            >
              {niveles.map(({ id }) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          )}
          rules={{
            required: "El nivel del trabajador es requerido",
          }}
        />
        {errors?.nivel ? (
          <FormHelperText error>{errors?.nivel?.message}</FormHelperText>
        ) : null}
        <FormHelperText></FormHelperText>
      </FormControl>
    </Grid>
  );
};
