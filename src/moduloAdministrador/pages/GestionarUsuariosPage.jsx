import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { getClientes, getTrabajadores } from "../helpers";
import { TableColumnsClientes, TableColumnsTrabajadores } from "../components";
import { ManageAccounts } from "@mui/icons-material";
import { DataGridTable, TitleWithIcon, TableTabs } from "../../ui/components";
import api from "../../services/instance";
const tabsLabels = [
  "Trabajadores",
  "Clientes",
]

export const GestionarUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      const trabajadores = await getTrabajadores();
      setUsuarios(trabajadores);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  const handleChange = async (event, newValue) => {
    setLoadingRows(true);
    if (newValue === 0) {
      (async () => {
        const trabajadores = await getTrabajadores();
        setUsuarios(trabajadores);
      })();
    } else if (newValue === 1) {
      (async () => {
        const clientes = await getClientes();
        setUsuarios(clientes);
      })();
    }
    setValue(newValue);
    setTimeout(() => {
      setLoadingRows(false);
    }, 1000);
  }

  const handleUpdateUsuarios = (usuarios) => {
    setUsuarios(usuarios);
  };

  return (
    <HelpDeskLayout>
      <TitleWithIcon icon={<ManageAccounts />} title="Gestionar usuarios" />
      <TableTabs
        tabsLabels={tabsLabels}
        value={value}
        handleChange={handleChange}
      />
      <DataGridTable
        height="90%"
        columnsTable={value === 0 ? TableColumnsTrabajadores : TableColumnsClientes}
        paramValue={handleUpdateUsuarios}
        rows={usuarios}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
