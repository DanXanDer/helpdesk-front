import { LockOutlined } from "@mui/icons-material";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ModuloSeguridadLayout = ({ children, pageTitle, titleDesc }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={15} square>
        <Box
          sx={{
            my: 25,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="span" mb={1}>
            {pageTitle}
          </Typography>
          <Typography component="h2" mb={1}>
            {titleDesc}
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
