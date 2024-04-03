import { Drafts } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { GalleryImages } from "./GalleryImages";

export const ModalDetailsMsg = ({
  modalOpen,
  handleClickOpen,
  handleClose,
  mensaje,
  fechaMensaje,
  imagenes,
}) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Drafts />}
      >
        Abrir
      </Button>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <Typography component="h5" variant="span">
                Mensaje: {mensaje}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Fecha de envío: {fechaMensaje}</DialogContentText>
        </DialogContent>
        {imagenes.length > 0 ? (
          <Grid item xs={12}>
            <GalleryImages imagenes={imagenes} height="400px" width="100%" />
          </Grid>
        ) : null}

        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
