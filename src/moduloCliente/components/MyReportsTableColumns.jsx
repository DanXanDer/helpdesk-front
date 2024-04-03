import { useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import api from "../../services/instance";
import { RenderedTicketStatusCell } from "../../ui/components/RenderedTicketStatusCell";
import { showAlertMessage } from "../../helpers";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  minWidth: 200,
};

export const MyReportsTableColumns = () => {

  const navigate = useNavigate();

  const columns = [
    {
      field: "summary",
      headerName: "Incidente",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "description",
      headerName: "Descripcion",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "worker",
      headerName: "Trabajador",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "creationDate",
      headerName: "Fecha de reporte",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "lastUpdate",
      headerName: "Última actualización",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1.1,
      renderCell: ({ row }) => {
        const { color, status } = row;
        return RenderedTicketStatusCell(color, status);
      },
      ...columnOptions,
    },
    {
      field: "acción",
      headerName: "Detalles",
      flex: 1.1,
      renderCell: ({ row }) => {
        const { id, status } = row;
        const handleClickInfo = () => {
          if (status === "Abierto") {
            showAlertMessage("info", "Información", "El reporte aún no ha sido asignado a un trabajador");
            return;
          }
          navigate(`${id}`);
        }
        return (
          <Button variant="contained" onClick={handleClickInfo}>
            <Info />
          </Button>
        )
      },
      ...columnOptions
    }
  ];

  return columns;
};
