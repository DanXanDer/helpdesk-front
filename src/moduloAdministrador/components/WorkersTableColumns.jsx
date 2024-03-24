import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { handleUserStatusChange } from "../helpers";
import { RenderedEnabledCell } from "../../ui/components";

const columnOptions = {
  headerAlign: "left",
  minWidth: 200,
  align: "left",
};

export const WorkersTableColumns = (handleUpdateUsers) => {
  const columns = [
    {
      field: "username",
      headerName: "Usuario",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1.2,
      ...columnOptions
    },
    {
      field: "lastname",
      headerName: "Apellidos",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1.2,
      ...columnOptions
    },
    {
      field: "enabled",
      headerName: "Estado",
      renderCell: ({ formattedValue }) => {
        return RenderedEnabledCell(formattedValue);
      },
      ...columnOptions,
    },
    {
      field: "accion",
      headerName: "Acción",
      renderCell: ({ row }) => {
        const { enabled } = row;
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
