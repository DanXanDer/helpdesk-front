import { Archive, Mail } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import { getTicketMensajes } from "../../helpers";

const actions = [
  {
    icon: <Archive />,
    name: "Mensajes",
  },
  {
    icon: <Mail />,
    name: "Contactar",
  },
];

export const SpeedDialComponent = ({
  handleClickOpenModalHistorialMensajes,
  handleClickOpenModalComunicarseCliente,
  idTicket,
  handleUpdateMsgTable,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = async (action) => {
    if (action === "Mensajes") {
      const ticketMensajes = await getTicketMensajes(idTicket);
      handleUpdateMsgTable(ticketMensajes);
      handleClickOpenModalHistorialMensajes();
    } else if (action === "Contactar") {
      handleClickOpenModalComunicarseCliente();
    }
    setOpen(false);
  };

  return (
    <Box sx={{ height: 100, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 5, right: -25 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClose(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
