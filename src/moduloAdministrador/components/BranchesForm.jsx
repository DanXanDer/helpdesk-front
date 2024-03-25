import { Controller, useFieldArray } from "react-hook-form";
import { AreasForm } from "./AreasForm";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { showAlertMessage } from "../../helpers";

export const BranchesForm = ({ control, errors, showAddButton }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "branches",
  });

  const handleRemove = (index) => {
    if (fields.length === 1) {
      showAlertMessage("warning", "Advertencia", "La empresa debe tener al menos una sede");
      return;
    }
    remove(index);
  }

  return (
    <>
      <Grid container justifyContent="space-between" spacing={1}>
        {fields.map((item, index) => (

          <Grid item xs={12} key={item.id}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                <Typography component="h4" variant="span">
                  Sede {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={9} lg={10.3} key={item.id}>
                <Controller
                  defaultValue={item.name}
                  name={`branches[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Ingrese ubicación de la sede ${index + 1}`}
                      margin="normal"
                      fullWidth
                      autoComplete={`branch${index + 1}`}
                      autoFocus
                      error={!!errors && !!errors.branches && !!errors.branches[index]?.name}
                      helperText={errors && errors.branches && errors.branches[index]?.name?.message}
                    />
                  )}
                  rules={{
                    required: "La dirección de la sede es requerida",
                    minLength: { value: 3, message: "La dirección de la sede debe tener al menos 3 caracteres" },
                    maxLength: { value: 100, message: "La dirección de la sede debe tener máximo 100 caracteres" },
                  }}

                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleRemove(index)} color="error">
                  <Delete />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <AreasForm branchIndex={index} branchRemove={remove} control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        ))}
        {
          showAddButton && (
            <Grid item>
              <Button
                variant="contained"
                onClick={() => append({ name: "" })}
                startIcon={<Add />}
              >
                Agregar sede
              </Button>
            </Grid>
          )
        }
      </Grid>
    </>
  );
};