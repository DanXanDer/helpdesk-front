import { getActionInfo, showAlertMessage, showConfirmationMessage } from "../../helpers";
import { EnableStatusButton, RenderedEnabledCell } from "../../ui/components";
import api from "../../services/instance";

const columnOptions = {
    headerAlign: "left",
    align: "left",
    minWidth: 130,
};

export const AreasTableColumns = ({ handleUpdateAreas, idBranch }) => {

    const columns = [
        {
            field: "name",
            headerName: "Área",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "clientsCount",
            headerName: "Clientes",
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
            ...columnOptions
        },
        {
            field: "accion",
            headerName: "Acción",
            flex: 1.1,
            renderCell: ({ row }) => {
                const { id: idArea, name, enabled } = row;
                const { actionText, color, subText } = getActionInfo(enabled);
                const handleAreChangeStatus = async () => {
                    const isConfirmed = await showConfirmationMessage(
                        `${actionText} área`,
                        `¿Está seguro de ${subText} el área de ${name}?`,
                        "warning"
                    );
                    if (!isConfirmed) return;
                    try {
                        await api.patch(`/areas/${idArea}/update`, { enabled: !enabled });
                        const { data: areas } = await api.get(`/branch/${idBranch}/areas`);
                        handleUpdateAreas(areas);
                        showAlertMessage("success", "Éxito", `Se ha actualizado el estado del área de ${name}`);
                    } catch (error) {
                        showAlertMessage("error", "Error", "Hubo un error. Intente nuevamente");
                    }
                }
                return (
                    <EnableStatusButton {...{ color, enabled, handleFunction: handleAreChangeStatus }} />
                )
            },
        }

    ]
    return columns;
}
