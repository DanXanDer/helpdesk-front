import { useState } from "react";
import { useForm } from "react-hook-form";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Add, Save } from "@mui/icons-material";
import { ModalTitle } from "../../ui/components";
import { BranchesForm } from "./BranchesForm";
import api from "../../services/instance";

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

export const ModalAddBranch = ({ handleUpdateBranches, icon, title, idCompany }) => {

    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({ defaultValues });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const onSubmit = async (data) => {
        try {
            const isConfirmed = await showConfirmationMessage(
                "Registrar sede",
                "¿Está seguro de continuar?",
                "warning"
            );
            if (!isConfirmed) return;
            const formData = {
                company: {
                    idCompany
                },
                name: data.branches[0].name,
                areas: data.branches[0].areas
            }
            await api.post("/branch", formData);
            const { data: companyDetails } = await api.get(`/company/${idCompany}`);
            handleUpdateBranches(companyDetails.branches);
            reset(defaultValues);
            handleClose();
            showAlertMessage("success", "Exito", "Sede agregada exitosamente");
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        }
    }

    return (
        <Box>
            <Button
                onClick={handleClickOpen}
                type="button"
                variant="contained"
                startIcon={<Add />}
            >
                Sede
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>
                    <ModalTitle icon={icon} title={title} />
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}>
                        <BranchesForm {...{ control, errors }} showAddButton={false} />
                        <DialogActions>
                            <Button variant="contained" type="submit" startIcon={<Save />} >Guardar</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
