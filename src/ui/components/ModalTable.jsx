import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomIcon } from "./CustomIcon";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

export const ModalTable = ({ mensajes, idTicket, open, handleClose }) => {
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <CustomIcon icon="history" />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                Mensajes
              </Typography>
            </Grid>
          </Grid>
          <Box mt={2} height="400px">
            
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
