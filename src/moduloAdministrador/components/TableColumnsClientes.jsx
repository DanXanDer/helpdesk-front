import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { handleUserStatusChange } from "../helpers";

const columnOptions = {
    headerAlign: "left",
    minWidth: 200,
    align: "left",
};


export const TableColumnsClientes = (handleUpdateUsers) => {
    const columns = [
        {
            field: "username",
            headerName: "Usuario",
            ...columnOptions
        },
        {
            field: "nombres",
            headerName: "Nombre",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "apellidos",
            headerName: "Apellidos",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "correo",
            headerName: "Correo",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "nombreEmpresa",
            headerName: "Empresa",
            ...columnOptions
        },
        {
            field: "nombreSede",
            headerName: "Sede",
            ...columnOptions
        },
        {
            field: "nombreArea",
            headerName: "Area",
            ...columnOptions
        },
        {
            field: "enabled",
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
                const { enabled, username } = row;
                const text =
                    enabled === 1 ? "Deshabilitar user" : "Habilitar user";
                const subText = enabled === 1 ? "deshabilitar" : "habilitar";
                const color = enabled === 1 ? "error" : "success";

                return (
                    <IconButton
                        color={color}
                        onClick={() => handleUserStatusChange("cliente", text, subText, username, row, handleUpdateUsers)}
                        sx={{ mr: 1 }}
                    >
                        {enabled === 1 ? <Block /> : <CheckCircle />}
                    </IconButton>
                );
            },
        }
    ]

    return columns;
}
