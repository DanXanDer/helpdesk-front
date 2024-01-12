import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { showConfirmationMessage } from "../../helpers";
import { getUsuarios } from "../helpers";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  minWidth: 200,
  align: "left",
};

export const TableColumnUsuarios = (handleUpdateUsuarios) => {
  const columns = [
    {
      field: "nombreUsuario",
      headerName: "Usuario",
      flex: 1.2,
      ...columnOptions,
    },
    { field: "nombres", headerName: "Nombre", flex: 1.2, ...columnOptions },
    {
      field: "apellidos",
      headerName: "Apellidos",
      flex: 1.2,
      ...columnOptions,
    },
    { field: "correo", headerName: "Correo", flex: 1.2, ...columnOptions },
    { field: "tipo", headerName: "Tipo", width: 100, ...columnOptions },
    {
      field: "estado",
      headerName: "Estado",
      ...columnOptions,
      renderCell: ({ formattedValue }) => {
        const color = formattedValue === 1 ? "success.dark" : "error.dark";
        const text = formattedValue === 1 ? "Habilitado" : "Deshabilitado";
        return <Typography color={color}>{text}</Typography>;
      },
    },
    {
      field: "accion",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const { estado, nombreUsuario } = row;
        const text =
          estado === 1 ? "Deshabilitar usuario" : "Habilitar usuario";
        const subText = estado === 1 ? "deshabilitar" : "habilitar";
        const color = estado === 1 ? "error" : "success";

        const handleUsuarioEstadoChange = async () => {
          const isConfirmed = await showConfirmationMessage(
            text,
            `¿Está seguro de ${subText} el usuario ${nombreUsuario}?`,
            "warning"
          );
          if (!isConfirmed) return;
          const { estado, id: idUsuario } = row;
          const nuevoEstado = estado === 1 ? 0 : 1;
          const formData = { idUsuario, estado: nuevoEstado };
          await api.post("/modulo-administrador/usuarios/cambiar-estado", formData);
          const { usuarios } = await getUsuarios();
          handleUpdateUsuarios(usuarios);
        };

        return (
          <IconButton
            color={color}
            onClick={() => handleUsuarioEstadoChange()}
            sx={{ mr: 1 }}
          >
            {estado === 1 ? <Block /> : <CheckCircle />}
          </IconButton>
        );
      },
    },
  ];

  return columns;
};
