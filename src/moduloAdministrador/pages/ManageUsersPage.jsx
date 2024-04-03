import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { getClients, getWorkers } from "../helpers";
import { ClientsTableColumns, ModalAddUser, WorkersTableColumns } from "../components";
import { ManageAccounts } from "@mui/icons-material";
import { DataGridTable, PageTitle, TableTabs } from "../../ui/components";
import { Grid } from "@mui/material";
const tabsLabels = [
  "Trabajadores",
  "Clientes",
]

export const ManageUsersPage = () => {
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
        const clients = await getClients();
        setUsers(clients);
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
      <Grid container justifyContent="space-between">
        <Grid item>
          <PageTitle icon={<ManageAccounts />} title="Lista de usuarios" />
        </Grid>
        <Grid item>
          <ModalAddUser />
        </Grid>
      </Grid>
      <TableTabs
        tabsLabels={tabsLabels}
        value={value}
        handleChange={handleChange}
      />
      <DataGridTable
        height="80%"
        tableColumns={value === 0 ? WorkersTableColumns : ClientsTableColumns}
        rows={users}
        loadingRows={loadingRows}
        params={
          {
            handleUpdateUsers,
          }
        }
      />
    </HelpDeskLayout>
  );
};
