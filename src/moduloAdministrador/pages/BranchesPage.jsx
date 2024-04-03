import { useEffect, useState } from "react";
import { PageTitle } from "../../ui/components/PageTitle";
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout";
import api from "../../services/instance";
import { showAlertMessage } from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Business } from "@mui/icons-material";
import { BranchesTableColumns, ModalAddBranch } from "../components";
import { Grid } from "@mui/material";
import { DataGridTable } from "../../ui/components";

const companyDetailsDefault = {
  company: "",
  branches: []
}

export const BranchesPage = () => {

  const { id } = useParams();

  const [companyDetails, setCompanyDetails] = useState(companyDetailsDefault);
  const [loadingRows, setLoadingRows] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: companyDetails } = await api.get(`/company/${id}`);
        setCompanyDetails(companyDetails);
        setTimeout(() => {
          setLoadingRows(false);
        }, 1000);
      } catch ({ response }) {
        const { message } = response.data;
        showAlertMessage("error", "Error", message);
        navigate("/");
      }
    })();
  }, [])

  const handleUpdateBranches = (branches) => {
    setCompanyDetails({ ...companyDetails, branches });
  }

  return (
    <HelpDeskLayout>
      <Grid container justifyContent="space-between" mb={2} >
        <Grid item>
          <PageTitle icon={<Business />} title={`${companyDetails.company} - Lista de sedes`} />
        </Grid>
        <Grid item>
          <ModalAddBranch handleUpdateBranches={handleUpdateBranches} idCompany={id} icon={<Business />} title="Agregar sede" />
        </Grid>
      </Grid>
      <DataGridTable
        height="90%"
        tableColumns={BranchesTableColumns}
        rows={companyDetails.branches}
        loadingRows={loadingRows}
        params={{ handleUpdateBranches }}
      />
    </HelpDeskLayout>
  )
}
