import { Details, Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { showAlertMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  width: 200,
};

export const TableColumnsIncidentes = () => {
  const navigate = useNavigate();

  const columns = [
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
      field: "fecha",
      headerName: "Fecha",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleReporteDetalles = () => {
          navigate(`${row.id}`);
        };
        return (
          <Button
            variant="contained"
            startIcon={<Info />}
            onClick={handleReporteDetalles}
          >
            Abrir
          </Button>
        );
      },
    },
  ];

  return columns;
};
