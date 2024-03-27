import { Edit, Save } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DataGridTable, ModalTitle } from "../../ui/components";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";
import { AreasTableColumns } from "./AreasTableColumns";
import { AddArea } from "./AddArea";


export const ModalEditBranch = ({ idBranch, idCompany, icon, name, handleUpdateBranches }) => {

    const [open, setOpen] = useState(false);
    const [areas, setAreas] = useState([])
    const [loadingRows, setLoadingRows] = useState(true);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const title = `Editar sede ${name}`

    const handleClose = () => {
        setOpen(false);
    }


    const handleClickOpen = async () => {
        setOpen(true);
        try {
            const { data: areas } = await api.get(`/branch/${idBranch}/areas`);
            setAreas(areas);
            setTimeout(() => {
                setLoadingRows(false);
            }, 2000);
        } catch (error) {
            showAlertMessage("error", "Error", "Ha ocurrido un error inesperado. Intente nuevamente");
        }
    }

    const handleUpdateAreas = (areas) => {
        setAreas(areas);
    }

    const onSubmitFormName = async (data) => {
        const isConfirmed = await showConfirmationMessage(
            "Actualizar nombre de sede",
            "¿Está seguro de continuar?",
            "warning"
        );
        if (!isConfirmed) return;
        try {
            handleClose();
            await api.patch(`/branch/${idBranch}/update`, data);
            const { data: companyDetails } = await api.get(`/company/${idCompany}`);
            handleUpdateBranches(companyDetails.branches);
            showAlertMessage("success", "Éxito", "Se han guardado los cambios");
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        }
    }

    return (
        <Box>
            <IconButton
                onClick={handleClickOpen}
            >
                <Edit />
            </IconButton>
            <Dialog {...{ open, onClose: handleClose }} >
                <DialogTitle>
                    <ModalTitle {...{ icon, title }} />
                </DialogTitle>
                <Box
                    component="form"
                    mt={-3}
                    noValidate
                    sx={{ width: "600px" }}
                    method="POST"
                    onSubmit={handleSubmit(onSubmitFormName)}>
                    <DialogContent>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={10}>
                                <Controller
                                    defaultValue={name}
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Nombre de sede"
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
                            </Grid>
                            <Grid item >
                                <Button variant="contained" type="submit">
                                    <Save />
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Box>
                <Box>
                    <DialogContent>
                        <DataGridTable
                            height="307px"
                            columnsTable={AreasTableColumns}
                            rows={areas}
                            loadingRows={loadingRows}
                            params={
                                {
                                    handleUpdateAreas,
                                    idBranch
                                }
                            }
                        />
                    </DialogContent>
                </Box>
                <AddArea {...{ idBranch, handleUpdateAreas }} />
            </Dialog>
        </Box>
    )
}
