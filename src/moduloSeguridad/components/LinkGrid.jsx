import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkGrid = ({ path, text }) => {
  return (
    <Grid container>
      <Grid item xs>
        <Link to={path}>{text}</Link>
      </Grid>
    </Grid>
  );
};
