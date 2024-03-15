import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { handleUserStatusChange } from "../helpers";

const columnOptions = {
  headerAlign: "left",
  minWidth: 200,
  align: "left",
};

export const ColumnsTableWorkers = (handleUpdateUsers) => {
  const columns = [
    {
      field: "username",
      headerName: "Usuario",
      valueGetter: (params) => params.row.username,
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Nombre",
      valueGetter: (params) => params.row.name,
      flex: 1.2,
      ...columnOptions
    },
    {
      field: "lastname",
      headerName: "Apellidos",
      valueGetter: (params) => params.row.lastname,
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "email",
      headerName: "Correo",
      valueGetter: (params) => params.row.email,
      flex: 1.2,
      ...columnOptions
    },
    {
      field: "enabled",
      headerName: "Estado",
      valueGetter: (params) => params.row.enabled,
      renderCell: ({ formattedValue }) => {
        const color = formattedValue === true ? "success.dark" : "error.dark";
        const text = formattedValue === true ? "Habilitado" : "Deshabilitado";
        return <Typography color={color}>{text}</Typography>;
      },
      ...columnOptions,
    },
    {
      field: "accion",
      headerName: "Acción",
      renderCell: ({ row }) => {
        const { enabled, username } = row;
        const isEnabled = enabled === true;
        const text = isEnabled ? "Deshabilitar usuario" : "Habilitar usuario";
        const subText = isEnabled ? "deshabilitar" : "habilitar";
        const color = isEnabled ? "error" : "success";
        return (
          <IconButton
            color={color}
            onClick={() => handleUserStatusChange(text, subText, row, handleUpdateUsers)}
            sx={{ mr: true }}
          >
            {enabled === true ? <Block /> : <CheckCircle />}
          </IconButton>
        );
      },
      ...columnOptions,
    },
  ];

  return columns;
};
