import { Grid, Paper, Typography } from "@mui/material";
import { PageTitle } from "./PageTitle";
import { Report } from "@mui/icons-material";
import { RenderedTicketStatusCell } from "./RenderedTicketStatusCell";
import { ModalTicketImages } from "./ModalTicketImages";

export const TicketDetails = ({ ticket, galleryImages }) => {

  const { summary, description, creationDate, lastUpdate, status, color } = ticket;

  return (
    <Grid container p={2} gap={2} flexDirection="column" component={Paper}>
      <Grid item xs={12}>
        <PageTitle
          icon={<Report />}
          title={"Incidente: " + summary}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Typography component="p" variant="span">
              Descripción del incidente: {description}
            </Typography>
          </Grid>
          <Grid container alignItems="center" mt={2} gap={3} >
            <Grid item>
              <Typography component="h5" variant="span">
                Reportado: {creationDate}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h5" variant="span">
                Actualizado: {lastUpdate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" >
        <Grid item>
          <ModalTicketImages images={galleryImages} height="400px" width="100%" />
        </Grid>
        <Grid item alignSelf="end" >
          <Typography component="h5" variant="span">
            {RenderedTicketStatusCell(color, status)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
