import { Edit } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { ModalTitle } from "../../ui/components";
import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const ModalEditBranch = ({ idBranch, idCompany, icon, name, handleUpdateBranches }) => {

    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const title = `Editar nombre de la sede ${name}`

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const onSubmit = async (data) => {
        try {
            handleClose();
            await api.patch(`/branch/${idBranch}/update`, data);
            const { data: companyDetails } = await api.get(`/company/${idCompany}`);
            handleUpdateBranches(companyDetails.branches);
            showAlertMessage("success", "Éxito", "Se ha actualizado el nombre de la sede");
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
