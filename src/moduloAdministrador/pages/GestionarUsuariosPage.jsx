import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { getClientes, getWorkers } from "../helpers";
import { TableColumnsClientes, ColumnsTableWorkers } from "../components";
import { ManageAccounts } from "@mui/icons-material";
import { DataGridTable, TitleWithIcon, TableTabs } from "../../ui/components";
const tabsLabels = [
  "Trabajadores",
  "Clientes",
]

export const GestionarUsuariosPage = () => {
  const [users, setUsers] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      const workers = await getWorkers();
      setUsers(workers);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  const handleChange = async (event, newValue) => {
    setLoadingRows(true);
    if (newValue === 0) {
      (async () => {
        const workers = await getWorkers();
        setUsers(workers);
      })();
    } else if (newValue === 1) {
      (async () => {
        const clientes = await getClientes();
        setUsers(clientes);
      })();
    }
    setValue(newValue);
    setTimeout(() => {
      setLoadingRows(false);
    }, 1000);
  }

  const handleUpdateUsers = (users) => {
    setUsers(users);
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
        columnsTable={value === 0 ? ColumnsTableWorkers : TableColumnsClientes}
        paramValue={handleUpdateUsers}
        rows={users}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
