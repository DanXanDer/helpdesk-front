import { Box, Button } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getUsuarios } from "../helpers";
import { TableColumns } from "../components";
import { useNavigate } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { CustomNoRowsOverlay } from "../../ui/components";

export const GestionarUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { usuarios } = await getUsuarios();
      setUsuarios(usuarios);
    })();
  }, []);

  const handleUpdateUsuarios = (usuarios) => {
    setUsuarios(usuarios);
  };

  const handleCrearUsuarioNavigate = () => {
    navigate("/gestionar-usuarios/crear-usuario");
  };

  return (
    <HelpDeskLayout>
      <Button
        variant="contained"
        sx={{
          mb: 2,
        }}
        startIcon={<PersonAdd />}
        onClick={handleCrearUsuarioNavigate}
      >
        Crear usuario
      </Button>
      <Box sx={{ height: 700 }}>
        <DataGrid
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TableColumns(handleUpdateUsuarios)}
          rows={usuarios}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </HelpDeskLayout>
  );
};
