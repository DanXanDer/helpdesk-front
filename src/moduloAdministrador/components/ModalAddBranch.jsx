import { useState } from "react";
import { useForm } from "react-hook-form";
import { showAlertMessage } from "../../helpers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Add } from "@mui/icons-material";
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
            handleClose();
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
                Agregar sede
            </Button>
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
                        <BranchesForm {...{ control, errors }} showAddButton={false} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} >Cerrar</Button>
                        <Button type="submit">Guardar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    )
}
