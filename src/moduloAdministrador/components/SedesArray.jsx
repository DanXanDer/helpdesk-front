import { Controller, useFieldArray } from "react-hook-form";
import { AreasArray } from "./AreasArray";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export const SedesArray = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sedes",
  });

  return (
    <>
      <Grid container justifyContent="space-between" spacing={1}>
        {fields.map((item, index) => (
          <Grid item xs={12} key={item.id}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} lg={11} key={item.id}>
                <Controller
                  defaultValue={item.direccion}
                  name={`sedes[${index}].direccion`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Ingrese ubicación de la sede ${index + 1}`}
                      margin="normal"
                      fullWidth
                      autoComplete={`sede${index + 1}`}
                      autoFocus
                      error={!!errors && !!errors.sedes && !!errors.sedes[index]?.direccion}
                      helperText={errors && errors.sedes && errors.sedes[index]?.direccion?.message}
                    />
                  )}
                  rules={{
                    required: "La dirección de la sede es requerida",
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => remove(index)} color="error">
                  <Delete />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <AreasArray sedeIndex={index} removeSede={remove} control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              append({
                direccion: "",
                areas: [{ nombre: "" }],
              });
            }}
            startIcon={<Add />}
          >
            Agregar sede
          </Button>
        </Grid>
      </Grid>
    </>
  );
};