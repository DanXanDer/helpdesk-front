import { Grid, Paper, Typography } from "@mui/material";
import { TableTitle } from "./TableTitle";
import { Report } from "@mui/icons-material";

export const ReportTicketDescription = ({ data }) => {
  return (
    <Grid container p={2} flexDirection="column" component={Paper}>
      <Grid item xs={12}>
        <TableTitle
          icon={<Report />}
          title={"Incidente: " + data.nombreIncidente}
        />
      </Grid>
      <Grid item mt={2} xs={12}>
        <Typography component="p" variant="span">
          Descripción del incidente: {data.descripcion}
        </Typography>
      </Grid>
      <Grid container justifyContent="space-between" mt={2}>
        <Typography component="h5" variant="span">
          Fecha de reporte: {data.fechaFormateada}
        </Typography>
        <Typography component="h5" variant="span">
          Estado: {data.enabled}
        </Typography>
      </Grid>
    </Grid>
  );
};
