import { ListAlt } from "@mui/icons-material";
import { HelpDeskLayout } from "../../ui/layout";
import { Grid, Typography } from "@mui/material";

export const BienvenidaPage = () => {
  return (
    <HelpDeskLayout>
      <Grid
        container
        sx={{
          backgroundColor: "primary.dark",
          borderRadius: 5,
          minHeight: "87vh",
          p: 3,
          color: "white",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <ListAlt sx={{ fontSize: "100px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Mesa de ayuda</Typography>
          </Grid>
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
