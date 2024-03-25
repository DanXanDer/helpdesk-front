import { Button, Grid, IconButton } from "@mui/material";
import { EnableStatusButton, RenderedEnabledCell } from "../../ui/components";
import { Block, Business, CheckCircle, Info } from "@mui/icons-material";
import api from "../../services/instance";
import { getActionInfo, showAlertMessage, showConfirmationMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { ModalEditCompany } from "./ModalEditCompany";

const columnOptions = {
    headerAlign: "left",
    align: "left",
    minWidth: 130,
};

export const CompaniesTableColumns = (handleUpdateCompanies) => {

    const navigate = useNavigate();

    const columns = [
        {
            field: "name",
            headerName: "Empresa",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "branchCount",
            headerName: "Sedes",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "areasCount",
            headerName: "Áreas",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "clientsCount",
            headerName: "Trabajadores",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "enabled",
            headerName: "Estado",
            flex: 1.1,
            renderCell: ({ formattedValue }) => {
                return RenderedEnabledCell(formattedValue);
            },
            ...columnOptions,
        },
        {
            field: "accion",
            headerName: "Acción",
            flex: 1.1,
            renderCell: ({ row }) => {
                const { id, name, enabled } = row;
                const { actionText, color, isEnabled, subText } = getActionInfo(enabled);
                const handleCompanyChangeStatus = async () => {
                    const isConfirmed = await showConfirmationMessage(
                        `${actionText} empresa`,
                        `¿Está seguro de ${subText} la empresa ${name}?`,
                        "warning"
                    );
                    if (!isConfirmed) return;
                    try {
                        await api.patch(`/company/${id}/update`, {
                            enabled: !isEnabled,
                        })
                        const { data: companies } = await api.get("/company");
                        handleUpdateCompanies(companies);
                        showAlertMessage("success", "Éxito", `Se ha cambiado el estado de la empresa ${name}`);
                    } catch (error) {
                        showAlertMessage("error", "Error", "Ha ocurrido un error inesperado. Intente nuevamente");
                    }
                }
                return (
                    <Grid container>
                        <Grid item>
                            <EnableStatusButton color={color} enabled={enabled} handleFunction={handleCompanyChangeStatus} />
                        </Grid>
                        <Grid item>
                            <ModalEditCompany id={id} icon={<Business />} name={name} handleUpdateCompanies={handleUpdateCompanies} />
                        </Grid>
                    </Grid>
                );
            },
            ...columnOptions,
        },
        {
            field: "details",
            headerName: "Detalles",
            ...columnOptions,
            renderCell: ({ row }) => {
                const handleDetails = () => {
                    navigate(`${row.id}`);
                }
                return (
                    <Button
                        variant="contained"
                        startIcon={<Info />}
                        onClick={handleDetails}
                    >
                        Abrir
                    </Button>
                )
            }
        }
    ]
    return columns;
}
