import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomIcon } from "./CustomIcon";
import { DataGrid } from "@mui/x-data-grid";
import { TableColumnsHistorialMensajes } from "../../moduloTrabajador/components/TableColumnsHistorialMensajes";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

export const ModalTable = ({ mensajes }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginTop: 4,
        }}
        startIcon={<CustomIcon icon="history" />}
        onClick={handleClickOpen}
      >
        Historial de mensajes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
      >
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item>
              <CustomIcon icon="history" />
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                Historial de mensajes
              </Typography>
            </Grid>
          </Grid>
          <Box mt={2} height="400px">
            <DataGrid
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              columns={TableColumnsHistorialMensajes()}
              rows={mensajes}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                noResultsOverlay: CustomNoRowsOverlay,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        </DialogTitle>
      </Dialog>
    </Box>
  );
};
