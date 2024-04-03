import { getActionInfo, showAlertMessage, showConfirmationMessage } from "../../helpers";
import { CustomizedActionsMenu, EnableStatusButton, RenderedEnabledCell } from "../../ui/components";
import api from "../../services/instance";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { ModalEditBranch } from "./ModalEditBranch";
import { Business } from "@mui/icons-material";

const columnOptions = {
    headerAlign: "left",
    align: "left",
    minWidth: 130,
};

export const BranchesTableColumns = ({ handleUpdateBranches }) => {

    const { id: idCompany } = useParams();

    const columns = [
        {
            field: "name",
            headerName: "Sede",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "areaCount",
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
                const { id: idBranch, name, enabled } = row;
                const { actionText, color, subText } = getActionInfo(enabled);
                const handleBranchChangeStatus = async () => {
                    const isConfirmed = await showConfirmationMessage(
                        `${actionText} sede`,
                        `¿Está seguro de ${subText} la sede de ${name}?`,
                        "warning"
                    );
                    if (!isConfirmed) return;
                    try {
                        await api.patch(`/branch/${idBranch}/update`, { enabled: !enabled, });
                        const { data: companyDetails } = await api.get(`/company/${idCompany}`);
                        handleUpdateBranches(companyDetails.branches);
                        showAlertMessage("success", "Éxito", `Se ha cambiado el estado de la sede ${name}`);
                    } catch (error) {
                        showAlertMessage("error", "Error", "Hubo un error. Intente nuevamente");
                    }
                };
                return (
                    <>
                        <CustomizedActionsMenu
                            enableStatusButton={<EnableStatusButton {...{
                                color,
                                enabled,
                                handleFunction: handleBranchChangeStatus
                            }} />}
                            modal={<ModalEditBranch {...{
                                idBranch,
                                idCompany,
                                icon: <Business />,
                                name,
                                handleUpdateBranches
                            }} />}
                        />
                    </>
                );
            }
        }
    ]
    return columns;
}
