import { Business } from "@mui/icons-material"
import { DataGridTable, ModalTitle, PageTitle } from "../../ui/components"
import { HelpDeskLayout } from "../../ui/layout"
import { useEffect, useState } from "react"
import api from "../../services/instance";
import { CompaniesTableColumns, ModalAddCompany } from "../components";
import { showAlertMessage } from "../../helpers";
import { Grid } from "@mui/material";

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
      <Grid container justifyContent="space-between" mb={2} >
        <Grid item>
          <PageTitle icon={<Business/>} title="Lista de empresas" />
        </Grid>
        <Grid item>
          <ModalAddCompany {...{handleUpdateCompanies}} />
        </Grid>
      </Grid>
      {<DataGridTable
        height="90%"
        tableColumns={CompaniesTableColumns}
        rows={companies}
        loadingRows={loadingRows}
        params={
          { handleUpdateCompanies }
        }
      />}
    </HelpDeskLayout>
  )
}
