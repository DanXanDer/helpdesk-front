import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  width: 200,
};

export const TableColumnsTickets = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "datosCliente",
      headerName: "Cliente",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Empresa",
      ...columnOptions
    },
    {
      field: "enabled",
      headerName: "Estado",
      ...columnOptions,
    },
    {
      field: "reporteFecha",
      headerName: "Fecha de reporte",
      ...columnOptions,
    },
    {
      field: "ticketFecha",
      headerName: "Fecha de creación de ticket",
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleTicketDetalles = () => {
          navigate(`${row.id}`);
        };

        return (
          <Button
            variant="contained"
            startIcon={<Info />}
            onClick={handleTicketDetalles}
          >
            Abrir
          </Button>
        );
      },
    },
  ];

  return columns;
};
