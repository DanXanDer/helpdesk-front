import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { handleUsuarioEstadoChange } from "../helpers";

const columnOptions = {
    headerAlign: "left",
    minWidth: 200,
    align: "left",
};


export const TableColumnsClientes = (handleUpdateUsuarios) => {
    const columns = [
        {
            field: "nombreUsuario",
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
                    estado === 1 ? "Deshabilitar user" : "Habilitar user";
                const subText = estado === 1 ? "deshabilitar" : "habilitar";
                const color = estado === 1 ? "error" : "success";

                return (
                    <IconButton
                        color={color}
                        onClick={() => handleUsuarioEstadoChange("cliente", text, subText, nombreUsuario, row, handleUpdateUsuarios)}
                        sx={{ mr: 1 }}
                    >
                        {estado === 1 ? <Block /> : <CheckCircle />}
                    </IconButton>
                );
            },
        }
    ]

    return columns;
}
