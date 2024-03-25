import { useEffect, useState } from "react"
import { PageTitle } from "../../ui/components/PageTitle"
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout"
import api from "../../services/instance";
import { showAlertMessage } from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Add, Business, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { BranchesForm, CompanyDetailsTableColumns, ModalAddBranch } from "../components";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGridTable } from "../../ui/components";

const defaultValues = {
  branches: [
    {
      name: "",
      areas: [
        {
          name: "",
        }
      ]
    }
  ]
}

const companyDetailsDefault = {
  company: "",
  branches: []
}

export const CompanyDetailsPage = () => {

  const { id } = useParams();

  const [companyDetails, setCompanyDetails] = useState(companyDetailsDefault);
  const [loadingRows, setLoadingRows] = useState(true);
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues });

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

  const onSubmit = (data) => {
    console.log(data);
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
        columnsTable={CompanyDetailsTableColumns}
        rows={companyDetails.branches}
        loadingRows={loadingRows}
        handleFunction={handleUpdateBranches}
      />
      {/* <Box
        component="form"
        noValidate
        sx={{ width: "100%" }}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Grid item xs={12}>
            <BranchesForm {...{ control, errors }} />
          </Grid>
          <Grid item xs={12} textAlign="center" >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<Save />}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box> */}
    </HelpDeskLayout>
  )
}
