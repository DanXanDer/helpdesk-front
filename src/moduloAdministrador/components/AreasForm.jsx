import { Add, Delete } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import { showAlertMessage } from "../../helpers";

export const AreasForm = ({ branchIndex, branchRemove, control, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `branches[${branchIndex}].areas`,

    });

    const handleRemove = (index) => {
        if (fields.length === 1) {
            showAlertMessage("warning", "Advertencia", "La sede debe tener al menos un área");
            return;
        }
        remove(index);
    };

    return (
        <div style={{
            marginLeft: "1rem",
            marginTop: "1rem"
        }}>

            <Grid container justifyContent="space-between" spacing={1}>
                {fields.map((item, index) => (
                    <Grid item xs={12} key={item.id}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={12}>
                                <Typography component="h4" variant="span">
                                    Sede {branchIndex + 1} - Área {index + 1}
                                </Typography>
                            </Grid>
                            <Grid item xs={9} lg={10.3} key={item.id}>
                                <Controller
                                    defaultValue={item.name}
                                    name={`branches[${branchIndex}].areas[${index}].name`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={`Ingrese nombre del área ${index + 1}`}
                                            margin="normal"
                                            fullWidth
                                            autoComplete={`area${index + 1}`}
                                            autoFocus
                                            error={!!errors && !!errors.branches && !!errors.branches[branchIndex]?.areas && !!errors.branches[branchIndex]?.areas[index]?.name}
                                            helperText={errors && errors.branches && errors.branches[branchIndex]?.areas && errors.branches[branchIndex]?.areas[index]?.name?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El nombre del área es requerido",
                                        minLength: { value: 3, message: "El nombre del área debe tener al menos 3 caracteres" },
                                        maxLength: { value: 100, message: "El nombre del área debe tener máximo 100 caracteres" },
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => handleRemove(index)} color="error" >
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
                            append({ name: "" });
                        }}
                        startIcon={<Add />}
                    >
                        Aumentar área
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
