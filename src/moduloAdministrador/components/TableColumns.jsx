import { Person } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { axiosPostRequest } from "../../helpers";
import { getApiUrl, getUsuarios } from "../helpers";

const columnOptions = {
  headerAlign: "left",
  width: 190,
  align: "left",
};

export const TableColumns = (handleUpdateUsuarios) => {
  const columns = [
    { field: "nombreUsuario", headerName: "Usuario", ...columnOptions },
    { field: "nombres", headerName: "Nombre", ...columnOptions },
    { field: "apellidos", headerName: "Apellidos", ...columnOptions },
    { field: "correo", headerName: "Correo", ...columnOptions },
    { field: "tipo", headerName: "Tipo", ...columnOptions },
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
        const { estado } = row;
        const text = estado === 1 ? "Deshabilitar" : "Habilitar";
        const color = estado === 1 ? "error" : "success";

        const handleUsuarioEstadoChange = async () => {
          const { estado, id: idUsuario } = row;
          const nuevoEstado = estado === 1 ? 0 : 1;
          const formData = { idUsuario, estado: nuevoEstado };
          await axiosPostRequest(`${getApiUrl()}/cambiar-estado-usuario`, formData);
          const { usuarios } = await getUsuarios();
          handleUpdateUsuarios(usuarios);
        };

        return (
          <Button
            variant="contained"
            color={color}
            startIcon={<Person />}
            onClick={() => handleUsuarioEstadoChange()}
          >
            {text}
          </Button>
        );
      },
    },
  ];

  return columns;
};
