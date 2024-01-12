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
      field: "cliente",
      headerName: "Cliente",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "fechaFormateada",
      flex: 1.1,
      headerName: "Fecha de creación",
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
