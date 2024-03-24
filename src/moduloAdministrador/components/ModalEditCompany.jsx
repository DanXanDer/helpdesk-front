import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material"
import { ModalTitle, TableTitle } from "../../ui/components"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { Edit } from "@mui/icons-material"
import api from "../../services/instance";
import { showAlertMessage } from "../../helpers"

export const ModalEditCompany = ({ id, icon, name, handleUpdateCompanies }) => {

    const [open, setOpen] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const title = `Editar nombre de la empresa ${name}`

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const onSubmit = async (data) => {
        try {
            handleClose();
            await api.patch(`/company/${id}/update`, data);
            const { data: companies } = await api.get("/company");
            handleUpdateCompanies(companies);
            showAlertMessage("success", "Éxito", "Se ha actualizado el nombre de la empresa");
        } catch ({ response }) {
            const { message } = response.data
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
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>
                    <ModalTitle icon={icon} title={title} />
                </DialogTitle>
                <Box
                    component="form"
                    mt={-3}
                    noValidate
                    sx={{ width: "600px" }}
                    method="POST"
                    onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Controller
                            defaultValue=""
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre de empresa"
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
                                    message: "El nombre de la empresa debe tener máximo 100 caracteres",
                                },
                                minLength: {
                                    value: 1,
                                    message: "El nombre la empresa no puede estar vacío",
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} >Cerrar</Button>
                        <Button type="submit">Actualizar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    )
}
