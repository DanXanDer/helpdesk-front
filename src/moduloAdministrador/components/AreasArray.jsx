import { Add, Delete } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

export const AreasArray = ({ sedeIndex, removeSede, control, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `sedes[${sedeIndex}].areas`,

    });

    const handleRemove = (k) => {
        remove(k);
        if (fields.length === 1) {
            removeSede(sedeIndex);
        }
    };

    return (
        <div style={{
            marginLeft: "1rem",
            marginTop: "1rem"
        }}>
            <Typography component="h3" variant="span">
                Areas de la sede {sedeIndex + 1}
            </Typography>
            <Grid container justifyContent="space-between" spacing={1}>
                {fields.map((item, k) => (
                    <Grid item xs={12} key={item.id}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={12} lg={11} key={item.id}>
                                <Controller
                                    defaultValue={item.nombre}
                                    name={`sedes[${sedeIndex}].areas[${k}].nombre`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={`Ingrese nombre del área ${k + 1}`}
                                            margin="normal"
                                            fullWidth
                                            autoComplete={`area${k + 1}`}
                                            autoFocus
                                            error={!!errors && !!errors.sedes && !!errors.sedes[sedeIndex]?.areas && !!errors.sedes[sedeIndex]?.areas[k]?.nombre}
                                            helperText={errors && errors.sedes && errors.sedes[sedeIndex]?.areas && errors.sedes[sedeIndex]?.areas[k]?.nombre?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El nombre del área es requerido",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => handleRemove(k)} color="error" >
                                    <Delete />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                ))}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            append({ nombre: "" });
                        }}
                        startIcon={<Add />}
                    >
                        Agregar área
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
