import { Add, Delete, Save } from "@mui/icons-material";
import { Box, Button, DialogContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import api from "../../services/instance";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useParams } from "react-router-dom";

export const AddArea = ({ idBranch, handleUpdateAreas, handleUpdateBranches }) => {

    const [addArea, setAddArea] = useState(false);

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        unregister,
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const isConfirmed = await showConfirmationMessage(
            "Agregar área",
            "¿Está seguro de continuar?",
            "warning"
        );
        if (!isConfirmed) return;
        try {
            await api.post("/areas", {
                ...data,
                branch: {
                    idBranch
                }
            });
            const { data: areas } = await api.get(`/branch/${idBranch}/areas`);
            const { data: { branches } } = await api.get(`/company/${id}`);
            handleUpdateAreas(areas);
            handleUpdateBranches(branches);
            showAlertMessage("success", "Éxito", "Se ha agregado el área");
            reset();
            setAddArea(false);
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        }
    }

    const handleClickAddArea = () => {
        register("name")
        setAddArea(true);
    }

    const handleClickCloseAddArea = () => {
        setAddArea(false);
        unregister("name");
    }

    return (
        <Box
            component="form"
            noValidate
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            mb={3}>
            <DialogContent>
                <Grid container>
                    {
                        !addArea && (
                            <Grid item xs={12} mt={2}>
                                <Button variant="outlined" onClick={handleClickAddArea} startIcon={<Add />}>
                                    área
                                </Button>
                            </Grid>
                        )
                    }
                    {
                        addArea && (
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={8}>
                                    <Box>
                                        <Controller
                                            defaultValue=""
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Nombre de área"
                                                    margin="normal"
                                                    autoFocus
                                                    error={!!errors.name}
                                                    helperText={errors?.name?.message}
                                                />
                                            )}
                                            rules={{
                                                required: "El nombre no puede estar vacío",
                                                maxLength: {
                                                    value: 100,
                                                    message: "El nombre de la sede debe tener máximo 100 caracteres",
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "El nombre la sede no puede estar vacío",
                                                }
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3} >
                                    <Grid container justifyContent="space-between">
                                        <Button type="submit" variant="contained">
                                            <Save />
                                        </Button>
                                        <Button type="button" onClick={handleClickCloseAddArea} variant="contained" color="error">
                                            <Delete />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </DialogContent>
        </Box>
    )
}
