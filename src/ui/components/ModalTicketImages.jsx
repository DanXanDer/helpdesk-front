import { useState } from "react"
import { showAlertMessage } from "../../helpers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Image } from "@mui/icons-material";
import { ModalTitle } from "./ModalTitle";
import { GalleryImages } from "./GalleryImages";

export const ModalTicketImages = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = async () => {
        try {
            setOpen(true);
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<Image />}
            >
                Imágenes
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <ModalTitle icon={<Image />} title="Imágenes adjuntas" />
                </DialogTitle>
                <DialogContent>
                    <GalleryImages images={images} height="60vh" width="100%" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CERRAR</Button>
                </DialogActions>
            </Dialog>

        </Box>
    )

}
