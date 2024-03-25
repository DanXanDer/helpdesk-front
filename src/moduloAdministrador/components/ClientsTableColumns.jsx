import { Block, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { handleUserStatusChange } from "../helpers";
import { RenderedEnabledCell } from "../../ui/components";
import { getActionInfo } from "../../helpers";

const columnOptions = {
    headerAlign: "left",
    minWidth: 200,
    align: "left",
};


export const ClientsTableColumns = (handleUpdateUsers) => {
    const columns = [
        {
            field: "username",
            headerName: "Usuario",
            ...columnOptions
        },
        {
            field: "name",
            headerName: "Nombre",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "lastname",
            headerName: "Apellidos",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "email",
            headerName: "Correo",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "company",
            headerName: "Empresa",
            ...columnOptions
        },
        {
            field: "branch",
            headerName: "Sede",
            ...columnOptions
        },
        {
            field: "area",
            headerName: "Area",
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
                const { actionText, color, subText } = getActionInfo(enabled);
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
    ]

    return columns;
}
