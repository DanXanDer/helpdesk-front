import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RenderedTicketStatusCell } from "../../ui/components/RenderedTicketStatusCell";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  minWidth: 130,
};

export const TicketsTableColumns = () => {
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
      field: "client",
      headerName: "Cliente",
      flex: 1.1,
      ...columnOptions
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
