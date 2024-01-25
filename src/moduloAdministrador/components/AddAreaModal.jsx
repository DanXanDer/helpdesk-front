import { Add, Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export const AddAreaModal = ({ cantidadAreasSede, numeroSede, getValues, clearErrors, setValue, unregister, control, errors, setCantidadAreasSede }) => {
  const [open, setOpen] = useState(false);
  const [cantidadAreas, setCantidadAreas] = useState(1);
  useEffect(() => {
    setCantidadAreasSede((prevState) => ({ ...prevState, [numeroSede]: cantidadAreas }))
  }, [cantidadAreas])

  useEffect(() => {
    if (!!cantidadAreasSede[numeroSede]) setCantidadAreas(cantidadAreasSede[numeroSede])
  }, [cantidadAreasSede])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubstractArea = (operation, index) => {
    if (operation === "add") {
      setCantidadAreas((prevState) => prevState + 1);
    } else {
      if (cantidadAreas === 1) return;
      if (index === cantidadAreas - 1) {
        unregister(`${numeroSede}-area${index + 1}`);
      } else {
        for (let i = index; i < cantidadAreas; i++) {
          setValue(`${numeroSede}-area${i + 1}`, getValues(`${numeroSede}-area${i + 2}`));
          clearErrors(`${numeroSede}-area${i + 1}`);
        }
        unregister(`${numeroSede}-area${cantidadAreas}`);
      }
      setCantidadAreas((prevState) => prevState - 1);
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} color="info" startIcon={<Add />}>
        Áreas
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Áreas de la sede de {numeroSede}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {Array.from({ length: cantidadAreas }, (_, index) => (
              <Grid item key={index} xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={9.5}>
                    <Controller
                      defaultValue=""
                      name={`${numeroSede}-area${index + 1}`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`Ingrese área ${index + 1}`}
                          margin="normal"
                          fullWidth
                          autoComplete={`${numeroSede}-area${index + 1}`}
                          autoFocus
                          error={!!errors[`${numeroSede}-area${index + 1}`]}
                          helperText={errors[`${numeroSede}-area${index + 1}`]?.message}
                        />
                      )}
                      rules={{
                        required: "El nombre del área es requerido",
                        minLength: {
                          value: 3,
                          message: "El nombre del área debe tener al menos 3 caracteres"
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" onClick={() => handleAddSubstractArea("substract", index)}>
                      <Delete />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="info" onClick={() => handleAddSubstractArea("add")}>
                <Add />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

