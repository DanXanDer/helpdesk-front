import { Business } from "@mui/icons-material"
import { DataGridTable, PageTitle } from "../../ui/components"
import { HelpDeskLayout } from "../../ui/layout"
import { useEffect, useState } from "react"
import api from "../../services/instance";
import { CompaniesTableColumns } from "../components";

export const CompaniesPage = () => {

  const [companies, setCompanies] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: companies } = await api.get("/company");
      setCompanies(companies);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    })();
  }, [])

  const handleUpdateCompanies = (companies) => {
    setCompanies(companies);
  }


  return (
    <HelpDeskLayout>
      <PageTitle icon={<Business />} title="Listado de empresas" />
      {<DataGridTable
        height="90%"
        columnsTable={CompaniesTableColumns}
        rows={companies}
        loadingRows={loadingRows}
        handleFunction={handleUpdateCompanies}
      />}
    </HelpDeskLayout>
  )
}
