import { HelpDeskLayout } from "../layout";
import { FormUpdatePassword, FormUserUpdate } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { useSecurityModelStore } from "../../hooks";
import { Box, Grid, Paper } from "@mui/material";
export const UserUpdatePage = () => {

  const [user, setUser] = useState(null);
  const { user: { id } } = useSecurityModelStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await api.get(`/users/${id}`);
        setUser(user)
      } catch (error) {
        navigate("/error");
      }
    })();
  }, [])


  return (
    <HelpDeskLayout>
      <Grid container spacing={2}>
        {
          user && (
            <Grid item xs={12}>
              <Box component={Paper} p={2} elevation={5} >
                <FormUserUpdate user={user} />
              </Box>
            </Grid>
          )
        }
        <Grid item xs={12}>
          <Box component={Paper} p={2} elevation={5} >
            <FormUpdatePassword />
          </Box>
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
