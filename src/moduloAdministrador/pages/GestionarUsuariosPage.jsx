import { HelpDeskLayout } from "../../ui/layout";
import { useEffect, useState } from "react";
import { getUsuarios } from "../helpers";
import { TableColumnUsuarios } from "../components";
import { ManageAccounts } from "@mui/icons-material";
import { DataGridTable, TitleWithIcon } from "../../ui/components";

export const GestionarUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    (async () => {
      const { usuarios } = await getUsuarios();
      setUsuarios(usuarios);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, []);

  const handleUpdateUsuarios = (usuarios) => {
    setUsuarios(usuarios);
  };

  return (
    <HelpDeskLayout>
      <TitleWithIcon icon={<ManageAccounts />} title="Gestionar usuarios" />
      <DataGridTable
        height="80%"
        columnsTable={TableColumnUsuarios}
        paramValue={handleUpdateUsuarios}
        rows={usuarios}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
