import { Grid, Typography } from "@mui/material"

export const ModalTitle = ({ icon, title }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <Typography component="h5" variant="span">
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}
