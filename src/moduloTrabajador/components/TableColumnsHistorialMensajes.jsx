import { useState } from "react";
import { ModalDetailsMsg } from "../../ui/components";
import api from "../../services/instance";
import { getImagenes } from "../../helpers";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  width: 160,
};

export const TableColumnsHistorialMensajes = (idTicket, isModal) => {
  const [openModalStates, setOpenModalStates] = useState({});
  const [imagenes, setImagenes] = useState([]);

  const handleClickOpenNestedModal = async (idMensaje) => {
    const baseUrl =
      import.meta.env.VITE_BACKEND_API_URL +
      `/modulo-sistema/tickets/${idTicket}/mensajes/${idMensaje}/imagenes`;
    const { data } = await api.get(
      `/modulo-sistema/mensajes/${idMensaje}/rutas-imagenes`
    );

    const imagenesParaGallery = await getImagenes(data, baseUrl);
    setImagenes(imagenesParaGallery);
    setOpenModalStates({
      ...openModalStates,
      [idMensaje]: true,
    });
  };

  const handleCloseNestedModal = (idMensaje) => {
    setOpenModalStates({
      ...openModalStates,
      [idMensaje]: false,
    });
  };

  const columns = [
    {
      field: "emisor",
      headerName: "Emisor",
      flex: isModal ? 0 : 1.1,
      ...columnOptions,
    },
    {
      field: "receptor",
      headerName: "Receptor",
      flex: isModal ? 0 : 1.1,
      ...columnOptions,
    },
    {
      field: "mensaje",
      headerName: "Mensaje",
      flex: isModal ? 0 : 1.2,
      ...columnOptions,
    },
    {
      field: "fechaMensaje",
      headerName: "Fecha",
      flex: isModal ? 0 : 1.1,
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const idModal = row.idMensaje;
        return (
          <ModalDetailsMsg
            key={row.idMensaje}
            modalOpen={openModalStates[idModal] || false}
            handleClickOpen={() => handleClickOpenNestedModal(idModal)}
            handleClose={() => handleCloseNestedModal(idModal)}
            mensaje={row.mensaje}
            fechaMensaje={row.fechaMensaje}
            imagenes={imagenes}
          />
        );
      },
    },
  ];

  return columns;
};
