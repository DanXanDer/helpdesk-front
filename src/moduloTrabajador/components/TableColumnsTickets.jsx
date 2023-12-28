import { Details } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
};

export const TableColumnsTickets = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      width: 350,
      ...columnOptions,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 480,
      ...columnOptions,
    },
    {
      field: "nivel",
      headerName: "Nivel",
      width: 100,
      ...columnOptions,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 200,
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Ver detalles",
      width: 150,
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleTicketDetalles = async () => {
          try {
            const { data } = await api.get(
              `modulo-trabajador/tickets/${row.id}`
            );
            navigate("detalles", {
              state: data,
            });
          } catch (error) {
            const { mensaje } = error.response.data.error;
            showAlertMessage("error", "Error", mensaje);
          }
        };

        return (
          <Button
            variant="contained"
            startIcon={<Details />}
            onClick={handleTicketDetalles}
          >
            Detalles
          </Button>
        );
      },
    },
  ];

  return columns;
};
