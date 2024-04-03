import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSecurityModelStore, useUiStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getActiveRoute, showAlertMessage, showConfirmationMessage } from '../../helpers';
import api from "../../services/instance";
import { HelpDeskLayout } from '../../ui/layout';
import { ModalTitle } from '../../ui/components';
import { Add, AddBusiness, Save } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { BranchesForm } from './BranchesForm';

const defaultValues = {
    branches: [
        {
            name: "",
            areas: [
                {
                    name: "",
                }
            ]
        }
    ]
}

export const ModalAddCompany = ({ handleUpdateCompanies }) => {

    const [open, setOpen] = useState(false);
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues,
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const onSubmit = async (data) => {
        const isConfirmed = await showConfirmationMessage(
            "Registrar empresa",
            "¿Está seguro de continuar?",
            "warning"
        );
        if (!isConfirmed) return;
        try {
            await api.post("/company", data);
            const { data: companies } = await api.get("/company");
            handleUpdateCompanies(companies);
            showAlertMessage("success", "Exito", "Empresa agregada exitosamente");
            reset(defaultValues);
            handleClose();
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        }
    };


    return (
        <Box>
            <Button
                onClick={handleClickOpen}
                type="button"
                variant="contained"
                startIcon={<Add />}
            >
                Empresa
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>
                    <ModalTitle icon={<AddBusiness />} title="Registrar emppresa" />
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container justifyContent="space-between" spacing={1}>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue=""
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ingrese nombre de la empresa"
                                            margin="normal"
                                            fullWidth
                                            autoComplete="name"
                                            autoFocus
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El nombre de la empresa es requerido",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BranchesForm {...{ control, errors }} showAddButton={true} />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button variant="contained" type="submit" startIcon={<Save />} >Guardar</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>

            </Dialog>
        </Box>
    )
}
